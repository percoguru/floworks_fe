import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import { Button, Card, Col, Row, Select } from "antd";
import { WeatherCard } from "./weatherCard";
import { ErrorMessage } from "./errorMessage";

const SearchDropdown = () => {
  const [options, setOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [weather, setWeather] = useState<any>();
  const [error, setError] = useState<any>();

  const useDebounce = (fn: Function, delay: number) => {
    const functionRef = useRef(fn);

    useEffect(() => {
      functionRef.current = fn;
    }, [fn]);

    const debouncedFunction = useMemo(() => {
      const callFn = (...params: any[]) => {
        functionRef.current?.(...params);
      };

      return debounce(callFn, delay);
    }, [delay]);

    return debouncedFunction;
  };

  const fetchResults = async (value: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/search?city=${value}`
      );
      const data = await response.json();
      if (response.status !== 200) {
        const data = await response.json();
        setError(data.error);
        return;
      }
      setOptions(data.data);
    } catch (err) {
      setError("Failed to get weather data");
    }
  };

  const debouncedFetch = useDebounce(fetchResults, 1000);

  const handleUserType = useCallback(async (value: string | any[]) => {
    if (value.length >= 3) {
      debouncedFetch(value);
    }
  }, []);

  const fetchWeatherData = async () => {
    if (selectedCity) {
      try {
        const selectedCityData = selectedCity.split("|");
        const lat = selectedCityData[1];
        const lon = selectedCityData[2];
        const response = await fetch(
          `http://localhost:4000/weather?lat=${lat}&lon=${lon}`
        );
        if (response.status !== 200) {
          const data = await response.json();
          setError(data.error);
          return;
        }
        console.log(response.status);
        const data = await response.json();
        setWeather(data.data);
      } catch (err) {
        setError("Failed to get weather data");
      }
    }
  };

  return (
    <Col>
      <Row>
        <Select
          showSearch
          placeholder="Enter 3 or more characters to search"
          onSearch={handleUserType}
          options={options.map((item: any, index) => ({
            value: `${item.name}|${item.lat}|${item.lon}`,
            label: `${item.name}${item.state ? `, ${item.state}` : ``}${
              item.country ? `, ${item.country}` : ``
            }`,
            key: index,
          }))}
          style={{ width: 400 }}
          onSelect={(val) => setSelectedCity(val)}
        ></Select>
      </Row>
      <Row
        style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      >
        <Button disabled={!selectedCity} onClick={fetchWeatherData}>
          Get Weather
        </Button>
      </Row>
      {weather && <WeatherCard weather={weather} selectedCity={selectedCity} />}
      {error && <ErrorMessage error={error} />}
    </Col>
  );
};

export default SearchDropdown;
