import { Card } from "antd";

export const ErrorMessage = (props: any) => {
  const { error } = props;
  return (
    <Card style={{ backgroundColor: "#e6a3a3", color: "white" }}>{error}</Card>
  );
};
