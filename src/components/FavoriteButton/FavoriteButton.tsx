import React from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggle }) => {
  return (
    <button data-testid="favorite-button" style={
      {
        border: 'none',
        cursor: 'pointer',
        borderRadius: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30px',
        height: '30px',
        backgroundColor: 'black',
        color: 'white'
      }
    } onClick={onToggle}>
      {isFavorite ? '❤️' : '♡'}
    </button>
  );
};

export default FavoriteButton;
