import useSWR from 'swr';
import { Book } from '../types';

const fetcher = (url: string) => fetch(url).then(response => response.json());

export function useBookList() {
  const { data, error } = useSWR<Book[]>('https://my-json-server.typicode.com/cutamar/mock/books', fetcher);

  return {
    books: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useBookDetail(id: string | undefined) {
  const { data, error } = useSWR<Book>(`https://my-json-server.typicode.com/cutamar/mock/books/${id}`, fetcher);

  return {
    book: data,
    isLoading: !error && !data,
    isError: error,
  };
}
