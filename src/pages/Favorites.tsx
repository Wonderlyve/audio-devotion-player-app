
import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import CourseList from '../components/CourseList';
import { Heart } from 'lucide-react';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <div className="inline-block bg-devotion-purple-100 p-3 rounded-full mb-3">
          <Heart className="h-6 w-6 text-devotion-purple-600" />
        </div>
        <h1 className="text-3xl font-bold">Mes Favoris</h1>
        <p className="text-muted-foreground mt-2">
          Retrouvez tous vos cours préférés ici
        </p>
      </div>

      <CourseList 
        courses={favorites} 
        title=""
        emptyMessage="Aucun cours dans vos favoris. Marquez des cours comme favoris pour les retrouver ici."
      />
    </div>
  );
};

export default Favorites;
