import axios from "axios";

const API_KEY = '6E5GHVRAZ6N5P82R';

export const getStockData = async (symbol) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&from_currency=${symbol}&to_currency=IDR&outputsize=compact&symbol=${symbol}&apikey=${API_KEY}`);

    return response.data || {};
  } catch (err) {
    return {
      error: err.toString(),
    }
  }
}