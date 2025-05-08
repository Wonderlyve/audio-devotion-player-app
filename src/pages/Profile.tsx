
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, BookOpen, Heart, Clock } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { favorites } = useFavorites();

  const stats = [
    { icon: BookOpen, label: 'Cours suivis', value: '0' },
    { icon: Heart, label: 'Favoris', value: favorites.length.toString() },
    { icon: Clock, label: 'Temps total', value: '0h' },
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="bg-devotion-purple-100 rounded-full p-6">
            <User size={64} className="text-devotion-purple-600" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold">Votre profil</h1>
            <p className="text-muted-foreground mb-4">Bienvenue sur GM cademy</p>
            <Button>Modifier le profil</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <div className="bg-devotion-purple-100 rounded-full p-3">
              <stat.icon className="h-6 w-6 text-devotion-purple-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Vos favoris</h2>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favorites.slice(0, 2).map(course => (
              <Link key={course.id} to={`/course/${course.id}`} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md">
                <img src={course.imageUrl} alt={course.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">
            Vous n'avez pas encore ajouté de cours à vos favoris.
          </p>
        )}
        
        {favorites.length > 0 && (
          <div className="mt-4 text-center">
            <Link to="/favorites">
              <Button variant="outline">Voir tous vos favoris</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
