import React, { useState } from 'react';
import BookItem from './BookItem/BookItem';
import Pagination from './Pagination/Pagination';
import { Book } from '../../types';
import './BookList.scss';

interface BookListProps {
  books: Book[];
  favorites: string[];
  onFavoriteToggle: (bookId: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, favorites, onFavoriteToggle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = books.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="book-list">
        {currentItems.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            isFavorite={favorites.includes(book.id)}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))}
      </div>
      <div className="book-list-pagination">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BookList;
