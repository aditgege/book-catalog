import React from 'react';
import { Book } from '../../types';

interface BookDetailsProps {
  book: Book | null;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  if (!book) {
    return <div className="book-details">No book selected.</div>;
  }

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Publication Date: {book.publicationDate}</p>
    </div>
  );
};

export default BookDetails;
