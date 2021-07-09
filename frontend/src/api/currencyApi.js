import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getCurrencyData = async () => {
  const { data } = await axios.get(`${baseUrl}?access_key=${apiKey} `);
  return data;
};
