import { useState } from "react";
import useAxiosWithInterceptor from "../helpers/jwt-interceptor";

interface IUseCrud<T> {
  data: T[];
  fetchData: () => Promise<void>;
  error: Error | null;
  isLoading: boolean;
}

const useCrud = <T>(initialData: T[], apiUrl: string): IUseCrud<T> => {
  const jwtAxios = useAxiosWithInterceptor();
  const [data, setData] = useState(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await jwtAxios.get(`/${apiUrl}`);
      console.log(response.data, "data1");
      setData(response.data);
      setError(null);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.status === 400) {
        setError(new Error("400"));
      }
      console.log("error");
      setError(error);
      setIsLoading(false);
    }
  };

  return { fetchData, data, error, isLoading };
};

export default useCrud;
