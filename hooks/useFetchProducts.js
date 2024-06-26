import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const source = axios.CancelToken.source();

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, {
          ...options,
          cancelToken: source.token,
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [url]);

  return { data, error, loading, setData};
};

export default useFetch;
