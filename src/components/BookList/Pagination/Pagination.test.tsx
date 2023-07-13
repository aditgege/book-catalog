import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { describe, beforeEach, test, expect, vitest } from 'vitest';

describe('Pagination', () => {
  const onPageChange = vitest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  test('renders pagination buttons', () => {
    const currentPage = 1;
    const totalPages = 5;

    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

    for (let i = 1; i <= totalPages; i++) {
      const button = screen.getByText(i.toString());
      expect(button).toBeInTheDocument();
    }
  });

  test('calls onPageChange when button is clicked', () => {
    const currentPage = 1;
    const totalPages = 5;

    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

    const button = screen.getByText('2');
    fireEvent.click(button);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('marks the current page as active', () => {
    const currentPage = 3;
    const totalPages = 5;

    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

    const activeButton = screen.getByText(currentPage.toString());
    expect(activeButton).toHaveClass('active');
  });
});
