import axios from "axios";

const API_ENDPOINT: string = ((process.env.TELEGRAM_URL as string) +
  process.env.TELEGRAM_KEY) as string;

const handlePost = async (data: any) => {
  const api = await axios.post(API_ENDPOINT, data);

  return api;
};

const handleGet = async () => {
    const api = await axios.get(API_ENDPOINT);

    return api;
}

export { handlePost, handleGet };
