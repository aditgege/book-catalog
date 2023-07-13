import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookDetail } from '../../hooks/useBookApi';
import { formatHumanReadableDate } from '../../utils/helpers';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import './BookDetail.scss';

interface BookDetailProps {
  favorites: string[];
  onFavoriteToggle: (bookId: string) => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ favorites, onFavoriteToggle }) => {
  const { id } = useParams<{ id: string }>();
  const { book, isLoading, isError } = useBookDetail(id);
  const navigate = useNavigate();
  const publicationDate = formatHumanReadableDate(book?.publicationDate || '');
  const isFavorite = favorites.includes(book?.id || '');

  const handleFavoriteToggle = () => {
    if (book?.id) {
      onFavoriteToggle(book?.id || '');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const imageSrc = book?.cover ? book.cover : '/img-notfound.jpg';

  if (isLoading) {
    return <div>Loading book details...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching book details.</div>;
  }

  return (
    <div>
      <div className="flex">
        <button style={{ marginBottom: '10px' }} onClick={handleBack}>
          Back
        </button>
      </div>
      <div className="book-detail-container">
        <div>
          <FavoriteButton isFavorite={isFavorite} onToggle={handleFavoriteToggle} />
        </div>
        <img src={imageSrc} alt={book?.title || 'Book Cover'} />
        <div className="book-detail-info">
          <p>Title: {book?.title}</p>
          <p>Author: {book?.author}</p>
          <p>Description: {book?.description}</p>
          <p>Publication Date: {publicationDate}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
