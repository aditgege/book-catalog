import React, { useState } from 'react';
import FavoriteButton from '../../FavoriteButton/FavoriteButton';
import { createExcerpt } from '../../../utils/helpers';
import { Book } from '../../../types';
import './BookItem.scss';

interface BookItemProps {
  book: Book;
  isFavorite: boolean;
  onBookClick: (book: Book) => void;
  onFavoriteToggle: (bookId: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, isFavorite, onBookClick, onFavoriteToggle }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    onBookClick(book);
  };

  const handleFavoriteToggle = () => {
    onFavoriteToggle(book.id);
  };

  const imageSrc = imageError ? '/img-notfound.jpg' : book.cover;
  const description = createExcerpt(book.description, 50);

  return (
    <div className="book-item">
      <img src={imageSrc} alt={book.title} onError={handleImageError} />
      <div className="flex flex-column">
        <div className="book-item-content">
          <h3>{book.title}</h3>
          <span>{book.author}</span>
          <p>{description}</p>
        </div>
        <div className="book-item-actions">
          <FavoriteButton 
            isFavorite={isFavorite} 
            onToggle={handleFavoriteToggle} 
          />
        </div>
      </div>
    </div>
  );
};

export default BookItem;
