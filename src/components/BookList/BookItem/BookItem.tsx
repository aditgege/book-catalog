
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { createExcerpt } from '../../../utils/helpers';
import { Book } from '../../../types';
import FavoriteButton from '../../FavoriteButton/FavoriteButton';
import './BookItem.scss';

interface BookItemProps {
  book: Book;
  isFavorite: boolean;
  onFavoriteToggle: (bookId: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, isFavorite, onFavoriteToggle }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const imageSrc = imageError ? '/img-notfound.jpg' : book.cover;
  const description = createExcerpt(book.description, 50);
  
  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  const handleFavoriteToggle = () => {
    onFavoriteToggle(book.id);
  };


  return (
    <div data-testid="book-item" className="book-item" onClick={handleClick}>
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
