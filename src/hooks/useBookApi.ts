import useSWR from 'swr';
import { Book } from '../types';

const fetcher = (url: string) => fetch(url).then(response => response.json());
export function useBookList() {
  const { data, error } = useSWR<Book[]>(
    'https://my-json-server.typicode.com/cutamar/mock/books',
    fetcher,
    {
      // controls whether the data should be revalidated when the window gains focus.
      revalidateOnFocus: false,
    }
  );

  return {
    books: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useBookDetail(id: string | undefined) {
  const { data, error } = useSWR<Book>(
    id ? `https://my-json-server.typicode.com/cutamar/mock/books/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    book: data,
    isLoading: !error && !data,
    isError: error,
  };
}
