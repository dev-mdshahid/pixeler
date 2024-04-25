import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useAppwrite = (fn) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  const fetchData = async () => {
    try {
      isLoading(true);
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert('Error while loading data', error);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};
