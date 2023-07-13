import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteButton from './FavoriteButton';
import { vitest } from 'vitest';

describe('FavoriteButton', () => {
  const onToggleMock = vitest.fn();

  test('renders the button with correct styles', () => {
    render(<FavoriteButton isFavorite={false} onToggle={onToggleMock} />);

    const favoriteButton = screen.getByTestId('favorite-button');

    expect(favoriteButton).toBeInTheDocument();
  
  });

  test('displays the correct icon based on isFavorite prop true', () => {
    render(<FavoriteButton isFavorite={true} onToggle={onToggleMock} />);
    
    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton).toHaveTextContent('❤️');
  });

  test('displays the correct icon based on isFavorite false', () => {
    render(<FavoriteButton isFavorite={false} onToggle={onToggleMock} />);

    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton).toHaveTextContent('♡');
  });

  test('calls onToggle when button is clicked', () => {
    render(<FavoriteButton isFavorite={false} onToggle={onToggleMock} />);
    const favoriteButton = screen.getByTestId('favorite-button');

    fireEvent.click(favoriteButton);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});
