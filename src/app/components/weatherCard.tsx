import { Card, Row } from "antd";

export const WeatherCard = (props: any) => {
  const { selectedCity, weather } = props;
  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "1rem",
        width: "100%",
      }}
    >
      <Card
        title={`Weather in ${selectedCity?.split("|")[0]}`}
        bordered={false}
        style={{ width: 300 }}
      >
        <Row>
          <p style={{ fontWeight: "bold" }}>Description - </p>
          <p> {weather?.description}</p>
        </Row>

        <Row>
          <p style={{ fontWeight: "bold" }}>Temperature - </p>
          <p> {weather?.temperature}</p>
        </Row>
        <Row>
          <p style={{ fontWeight: "bold" }}>Humidity - </p>
          <p> {weather?.humidity} %</p>
        </Row>
        <Row>
          <p style={{ fontWeight: "bold" }}>Wind Speed - </p>
          <p> {weather?.windSpeed} mph</p>
        </Row>
      </Card>
    </Row>
  );
};
