import { render, screen } from '@testing-library/react';
import BookDetail from './BookDetails';
import { vi } from 'vitest';

// Mocking react-router-dom dependencies
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
  useNavigate: () => vi.fn(),
}));

// Mocking useBookDetail hook
vi.mock('../../hooks/useBookApi', () => ({
  useBookDetail: () => ({
    book: {
      id: '1',
      title: 'Book Title',
      author: 'Author Name',
      description: 'Book description',
      publicationDate: '2023-07-01',
      cover: '/book-cover.jpg',
    },
    isLoading: false,
    isError: false,
  }),
}));

describe('BookDetail component cover', () => {
  test('renders book details correctly', () => {
    render(<BookDetail favorites={[]} onFavoriteToggle={vi.fn()} />);

    expect(screen.getByAltText('Book Title')).toHaveAttribute('src', '/book-cover.jpg');
    expect(screen.getByText('Publication Date: July 1, 2023')).toBeInTheDocument();
  });
});
