
import React from 'react';
import { Course } from '../types/course';
import { usePlayer } from '../context/PlayerContext';
import { useFavorites } from '../context/FavoritesContext';
import { Play, Pause, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, className }) => {
  const { playCourse, currentCourse, isPlaying, pauseCourse, resumeCourse } = usePlayer();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const isCurrentlyPlaying = currentCourse?.id === course.id && isPlaying;
  const isCurrentlySelected = currentCourse?.id === course.id;
  const isFavorited = isFavorite(course.id);

  const handlePlayButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCurrentlySelected) {
      if (isPlaying) {
        pauseCourse();
      } else {
        resumeCourse();
      }
    } else {
      playCourse(course);
    }
  };

  const handleFavoriteButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(course);
  };

  // Fonction pour obtenir la couleur de badge basée sur la catégorie
  const getCategoryColor = () => {
    switch (course.category) {
      case 'piano':
        return 'bg-blue-100 text-blue-800';
      case 'guitare':
        return 'bg-green-100 text-green-800';
      case 'voix':
        return 'bg-red-100 text-red-800';
      case 'batterie':
        return 'bg-yellow-100 text-yellow-800';
      case 'basse':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className={cn("course-card overflow-hidden shadow-md", className)}>
      <Link to={`/course/${course.id}`} className="block">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs ${getCategoryColor()}`}>
            {course.category}
          </div>
          {course.level && (
            <div className="absolute top-2 right-10 px-2 py-1 bg-white/80 rounded-full text-xs">
              {course.level}
            </div>
          )}
          <Button 
            className="play-btn absolute right-2 bottom-2 rounded-full w-10 h-10 p-0 bg-devotion-purple-600 hover:bg-devotion-purple-700"
            onClick={handlePlayButton}
          >
            {isCurrentlyPlaying ? (
              <Pause size={18} className="animate-pulse" fill="white" />
            ) : (
              <Play size={18} fill="none" />
            )}
          </Button>
          <Button
            variant="ghost" 
            className="absolute top-2 right-2 rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white"
            onClick={handleFavoriteButton}
          >
            <Heart size={16} className={isFavorited ? "text-red-500 fill-red-500" : "text-gray-600"} />
          </Button>
        </div>
        <CardContent className="py-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{course.title}</h3>
              <p className="text-sm text-muted-foreground">{course.instructor}</p>
            </div>
            <span className="bg-devotion-purple-100 text-devotion-purple-700 text-xs px-2 py-1 rounded-full">
              {course.type}
            </span>
          </div>
          <div className="flex justify-between text-xs mt-2 text-muted-foreground">
            <span>{new Date(course.date).toLocaleDateString()}</span>
            <span>{course.duration}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CourseCard;
