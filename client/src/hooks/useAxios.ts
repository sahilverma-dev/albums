import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface ApiResponse {
  data: any;
  error: any;
  isLoading: boolean;
}

const useAxios = (url: string, options?: any) => {
  const [response, setResponse] = useState<ApiResponse>({
    data: null,
    error: null,
    isLoading: true,
  });

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/`,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        setResponse({ data: null, error: null, isLoading: true });
        const res: AxiosResponse = await api({
          url,
          ...options,
          signal,
        });
        setResponse({ data: res.data, error: null, isLoading: false });
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Request was aborted");
        } else if (err.response) {
          setResponse({
            data: null,
            error: err.response.data,
            isLoading: false,
          });
        } else {
          setResponse({ data: null, error: err.message, isLoading: false });
        }
      }
    };
    fetchData();
    return () => controller.abort();
  }, [url, options]);

  return response;
};

export default useAxios;
