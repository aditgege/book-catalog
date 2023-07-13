import useSWR from 'swr';
import { Book } from '../types';

const fetcher = (url: string) => fetch(url).then(response => response.json());

const useBookData = () => {
  const { data, error } = useSWR<Book[]>('https://my-json-server.typicode.com/cutamar/mock/books', fetcher);

  return {
    data,
    error,
  };
};

export default useBookData;
