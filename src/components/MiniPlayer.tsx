
import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, X, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useFavorites } from '../context/FavoritesContext';
import { toast } from '@/components/ui/use-toast';

const MiniPlayer: React.FC = () => {
  const { currentCourse, isPlaying, pauseCourse, resumeCourse, stopCourse } = usePlayer();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  if (!currentCourse) return null;
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentCourse.title,
        text: `Regarder ${currentCourse.title} par ${currentCourse.instructor}`,
        url: window.location.href
      }).catch(err => {
        console.log('Error sharing:', err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Lien copié",
          description: "Le lien a été copié dans le presse-papier."
        });
      });
    }
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white shadow-lg border-t z-10 px-3 py-2">
      <div className="flex items-center">
        <Link to={`/course/${currentCourse.id}`} className="flex-shrink-0">
          <img
            src={currentCourse.imageUrl}
            alt={currentCourse.title}
            className="h-12 w-12 rounded object-cover"
          />
        </Link>
        
        <div className="ml-3 overflow-hidden flex-grow">
          <Link to={`/course/${currentCourse.id}`}>
            <h3 className="font-medium text-sm truncate pr-2">{currentCourse.title}</h3>
            <p className="text-xs text-muted-foreground truncate">{currentCourse.instructor}</p>
          </Link>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 rounded-full p-0"
            onClick={() => toggleFavorite(currentCourse)}
          >
            <Heart 
              size={18} 
              className={isFavorite(currentCourse.id) ? "text-red-500 fill-red-500" : ""}
            />
          </Button>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 rounded-full p-0"
            onClick={handleShare}
          >
            <Share2 size={18} />
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 rounded-full p-0 text-devotion-purple-600"
            onClick={isPlaying ? pauseCourse : resumeCourse}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 rounded-full p-0 text-gray-500"
            onClick={stopCourse}
          >
            <X size={18} />
          </Button>
        </div>
      </div>
      
      <div className="h-1 bg-gray-200 mt-1 rounded-full overflow-hidden">
        <div className="h-full bg-devotion-purple-600 w-1/3"></div>
      </div>
    </div>
  );
};

export default MiniPlayer;
