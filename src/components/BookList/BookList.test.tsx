import { render, screen } from '@testing-library/react';
import BookList from './BookList';
import { vitest, vi } from 'vitest';
const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

describe('BookList', () => {
  const booksMock = [
    { id: '1', title: 'Book 1', author: 'Author 1', cover: 'book1.jpg', description: 'Description 1', publicationDate: '2020-01-01' },
    { id: '2', title: 'Book 2', author: 'Author 2', cover: 'book2.jpg', description: 'Description 2', publicationDate: '2020-01-01'},
    { id: '3', title: 'Book 3', author: 'Author 3', cover: 'book3.jpg', description: 'Description 3', publicationDate: '2020-01-01' },
  ];

  const favoritesMock = ['1', '3'];

  const onFavoriteToggleMock = vitest.fn();

  test('renders book items with correct props', () => {
    render(<BookList books={booksMock} favorites={favoritesMock} onFavoriteToggle={onFavoriteToggleMock} />);

    const bookItems = screen.getAllByTestId('book-item');

    expect(bookItems).toHaveLength(3);

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();

    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();

    expect(screen.getByText('Book 3')).toBeInTheDocument();
    expect(screen.getByText('Author 3')).toBeInTheDocument();

    expect(bookItems[0]).toHaveStyle({ display: 'flex' });
    expect(bookItems[1]).toHaveStyle({ display: 'flex' });
    expect(bookItems[2]).toHaveStyle({ display: 'flex' });
  });

  test('renders pagination with correct props', () => {
    render(<BookList books={booksMock} favorites={favoritesMock} onFavoriteToggle={onFavoriteToggleMock} />);

    const pagination = screen.getByTestId('pagination');

    expect(pagination).toBeInTheDocument();
  });
});
