import axios from "axios";
import React, { useState, useEffect } from "react";

function useFetch(url, initialState=null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return {
    data,
    loading,
    error,
  };
}

export default useFetch;
