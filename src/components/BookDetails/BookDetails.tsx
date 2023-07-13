import React, { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useBookDetail } from '../../hooks/useBookApi';
import { formatHumanReadableDate } from '../../utils/helpers';
import './BookDetail.scss';

const BookDetail: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { book, isLoading, isError } = useBookDetail(id);
  const navigate = useNavigate();
  const handleImageError = () => {
    setImageError(true);
  };

  const handleBack = () => {
    navigate(-1);
  }


  if (isLoading) {
    return <div>Loading book details...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching book details.</div>;
  }

  const imageSrc = imageError ? '/img-notfound.jpg' : book?.cover;
  const publicationDate = formatHumanReadableDate(book?.publicationDate || '')

  return (
    <>
      <div className='flex'>
        <button style={{ marginBottom: '10px'}} onClick={handleBack}>Back</button>
      </div>
      <div className="book-detail-container">
        <img src={imageSrc} alt={book?.title || 'Book Cover'} onError={handleImageError} />
        <div className="book-detail-info">
          <p>Title: {book?.title}</p>
          <p>Author: {book?.author}</p>
          <p>Description: {book?.description}</p>
          <p>Publication Date: {publicationDate}</p>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
