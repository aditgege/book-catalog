import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import BookItem from './BookItem';

const onFavoriteToggleMock = vi.fn();
const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

const bookMock = {
  id: '1',
  title: 'Sample Book',
  author: 'John Doe',
  cover: 'book-cover.jpg',
  description: 'Lorem ipsum dolor sit amet',
  publicationDate: '2020-01-01',
};

describe('BookItem component', () => {
  test('renders book item correctly and navigates to book detail page when clicked', () => {
    const isFavorite = false;

    render(<BookItem book={bookMock} isFavorite={isFavorite} onFavoriteToggle={onFavoriteToggleMock} />);

    const titleElement = screen.getByText('Sample Book');
    expect(titleElement).toBeInTheDocument();

    const authorElement = screen.getByText('John Doe');
    expect(authorElement).toBeInTheDocument();

    const descriptionElement = screen.getByText('Lorem ipsum dolor sit amet');
    expect(descriptionElement).toBeInTheDocument();

    const bookCoverImage = screen.getByRole('img', { name: 'Sample Book' });
    expect(bookCoverImage).toBeInTheDocument();
    expect(bookCoverImage.getAttribute('src')).toBe('book-cover.jpg');

    const bookItem = screen.getByTestId('book-item');
    fireEvent.click(bookItem);

    expect(navigateMock).toHaveBeenCalledWith('/book/1');
  });

  test('calls onFavoriteToggle when favorite button is clicked', () => {
    const isFavorite = false;

    render(<BookItem book={bookMock} isFavorite={isFavorite} onFavoriteToggle={onFavoriteToggleMock} />);

    const favoriteButton = screen.getByTestId('favorite-button');
    fireEvent.click(favoriteButton);

    expect(onFavoriteToggleMock).toHaveBeenCalledTimes(1);
    expect(onFavoriteToggleMock).toHaveBeenCalledWith('1');
  });
});
