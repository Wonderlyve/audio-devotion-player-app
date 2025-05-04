
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Sermon } from '../types/sermon';

interface FavoritesContextProps {
  favorites: Sermon[];
  toggleFavorite: (sermon: Sermon) => void;
  isFavorite: (sermonId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Sermon[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('sermon-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites from localStorage');
      }
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('sermon-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (sermon: Sermon) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === sermon.id);
      
      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav.id !== sermon.id);
      } else {
        return [...prevFavorites, sermon];
      }
    });
  };

  const isFavorite = (sermonId: string) => {
    return favorites.some(sermon => sermon.id === sermonId);
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
