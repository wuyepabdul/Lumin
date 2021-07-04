import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getCurrencyData = () => {
  const { data } = axios.get(`${baseUrl}?access_key=${apiKey}`);
  console.log("data");
  return data;
};
