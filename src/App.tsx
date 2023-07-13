import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useBookList} from './hooks/useBookApi';
import BookList from './components/BookList/BookList';
import BookDetail from './components/BookDetails/BookDetails';
import './App.scss';

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { books, isError } = useBookList();

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

  const handleFavoriteToggle = (bookId: string) => {
    if (favorites.includes(bookId)) {
      setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== bookId));
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, bookId]);
    }
  };

  if (isError) {
    return <div>Error fetching books</div>;
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="app">
            <h1>Book App</h1>
            <div className="container">
              {books ? (
                <BookList
                  books={books}
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ) : (
                <div>Loading books...</div>
              )}
            </div>
          </div>
        } />
        <Route path="/book/:id" element={<BookDetail onFavoriteToggle={handleFavoriteToggle} favorites={favorites} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
