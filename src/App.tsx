import React, { useState, useEffect } from 'react';
import BookList from './components/BookList/BookList';
import useBookData from './hooks/useBookData';
import { Book } from './types';
import './App.scss';

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { data: books, error } = useBookData();

  const handleBookClick = (book: Book) => {
    // setSelectedBook(book);
  };

  const handleFavoriteToggle = (bookId: string) => {
    if (favorites.includes(bookId)) {
      setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== bookId));
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, bookId]);
    }
  };

  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem('favorites');

    if (favoritesFromStorage) {
      setFavorites(JSON.parse(favoritesFromStorage));
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  if (error) {
    return <div>Error fetching books</div>;
  }

  return (
    <div className="app">
      <h1>Book App</h1>
      <div className="container">
        {books ? (
          <BookList
            books={books}
            favorites={favorites}
            onBookClick={handleBookClick}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ) : (
          <div>Loading books...</div>
        )}
      </div>
    </div>
  );
};

export default App;
