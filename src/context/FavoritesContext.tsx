
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course } from '../types/course';

interface FavoritesContextProps {
  favorites: Course[];
  toggleFavorite: (course: Course) => void;
  isFavorite: (courseId: string) => boolean;
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
  const [favorites, setFavorites] = useState<Course[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('course-favorites');
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
    localStorage.setItem('course-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (course: Course) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === course.id);
      
      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav.id !== course.id);
      } else {
        return [...prevFavorites, course];
      }
    });
  };

  const isFavorite = (courseId: string) => {
    return favorites.some(course => course.id === courseId);
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
