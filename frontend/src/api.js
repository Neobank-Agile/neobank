export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : window.API_URL;
export const GRAFANA_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2999"
    : window.GRAFANA_URL;
