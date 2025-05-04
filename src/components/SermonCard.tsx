
import React from 'react';
import { Sermon } from '../types/sermon';
import { usePlayer } from '../context/PlayerContext';
import { useFavorites } from '../context/FavoritesContext';
import { Play, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SermonCardProps {
  sermon: Sermon;
  className?: string;
}

const SermonCard: React.FC<SermonCardProps> = ({ sermon, className }) => {
  const { playSermon, currentSermon, isPlaying, pauseSermon, resumeSermon } = usePlayer();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const isCurrentlyPlaying = currentSermon?.id === sermon.id && isPlaying;
  const isCurrentlySelected = currentSermon?.id === sermon.id;
  const isFavorited = isFavorite(sermon.id);

  const handlePlayButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCurrentlySelected) {
      if (isPlaying) {
        pauseSermon();
      } else {
        resumeSermon();
      }
    } else {
      playSermon(sermon);
    }
  };

  const handleFavoriteButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(sermon);
  };
  
  return (
    <Card className={cn("sermon-card overflow-hidden shadow-md", className)}>
      <Link to={`/sermon/${sermon.id}`} className="block">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={sermon.imageUrl} 
            alt={sermon.title} 
            className="w-full h-full object-cover"
          />
          <Button 
            className="play-btn absolute right-2 bottom-2 rounded-full w-10 h-10 p-0 bg-devotion-purple-600 hover:bg-devotion-purple-700"
            onClick={handlePlayButton}
          >
            <Play size={18} className={isCurrentlyPlaying ? "animate-pulse" : ""} fill={isCurrentlyPlaying ? "white" : "none"} />
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
          <h3 className="font-semibold text-lg line-clamp-1">{sermon.title}</h3>
          <p className="text-sm text-muted-foreground">{sermon.preacher}</p>
          <div className="flex justify-between text-xs mt-2 text-muted-foreground">
            <span>{new Date(sermon.date).toLocaleDateString()}</span>
            <span>{sermon.duration}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default SermonCard;
