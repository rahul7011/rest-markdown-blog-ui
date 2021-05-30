import axios from "axios";
import React, { useState, useEffect } from "react";
import authAxios, {
  AuthenticationService,
} from "../Services/AuthenticationServices";

function useFetch(url, initialState = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let ax = axios;
        if (AuthenticationService.isAuthenticated) {
          ax = authAxios;
        }
        const response = await ax.get(url);
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
