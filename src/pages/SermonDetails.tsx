
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sermons } from '../data/sermons';
import { usePlayer } from '../context/PlayerContext';
import { useFavorites } from '../context/FavoritesContext';
import { Play, Pause, ArrowLeft, Share2, Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const SermonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentSermon, isPlaying, playSermon, pauseSermon, resumeSermon } = usePlayer();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const sermon = sermons.find(s => s.id === id);
  
  if (!sermon) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold">Prédication non trouvée</h2>
        <Button onClick={() => navigate('/')} className="mt-4">
          Retourner à l'accueil
        </Button>
      </div>
    );
  }
  
  const isCurrentSermon = currentSermon?.id === sermon.id;
  const isCurrentlyPlaying = isCurrentSermon && isPlaying;
  const isFavorited = isFavorite(sermon.id);
  
  const handlePlayButton = () => {
    if (isCurrentSermon) {
      if (isPlaying) {
        pauseSermon();
      } else {
        resumeSermon();
      }
    } else {
      playSermon(sermon);
    }
  };
  
  const handleShareButton = () => {
    if (navigator.share) {
      navigator.share({
        title: sermon.title,
        text: `Écouter ${sermon.title} par ${sermon.preacher}`,
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
  
  const handleDownloadButton = () => {
    const link = document.createElement('a');
    link.href = sermon.audioUrl;
    link.download = `${sermon.title.replace(/\s+/g, '_')}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Téléchargement démarré",
      description: "La prédication commence à se télécharger."
    });
  };

  return (
    <div className="container mx-auto px-4 py-4 max-w-3xl">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-1" size={16} />
        Retour
      </Button>
      
      <Card className="overflow-hidden mb-6">
        <div className="relative h-56 sm:h-64">
          <img 
            src={sermon.imageUrl} 
            alt={sermon.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{sermon.title}</h1>
            <Button 
              variant="outline" 
              size="sm" 
              className={`ml-2 ${isFavorited ? 'border-red-200 text-red-500' : ''}`}
              onClick={() => toggleFavorite(sermon)}
            >
              <Heart size={18} className={isFavorited ? "text-red-500 fill-red-500" : ""} />
            </Button>
          </div>
          
          <p className="text-muted-foreground mt-1">{sermon.preacher}</p>
          
          <div className="flex items-center text-sm text-muted-foreground mt-3">
            <span>{new Date(sermon.date).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{sermon.duration}</span>
            {sermon.scripture && (
              <>
                <span className="mx-2">•</span>
                <span>{sermon.scripture}</span>
              </>
            )}
          </div>
          
          <div className="mt-6 flex gap-3">
            <Button 
              className="flex-1 bg-devotion-purple-600 hover:bg-devotion-purple-700"
              onClick={handlePlayButton}
            >
              {isCurrentlyPlaying ? (
                <>
                  <Pause className="mr-2" size={18} /> Pause
                </>
              ) : (
                <>
                  <Play className="mr-2" size={18} /> Écouter
                </>
              )}
            </Button>
            
            <Button variant="outline" onClick={handleShareButton}>
              <Share2 size={18} />
            </Button>
            
            <Button variant="outline" onClick={handleDownloadButton}>
              <Download size={18} />
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h2 className="font-semibold text-lg mb-2">Description</h2>
            <p className="text-muted-foreground">{sermon.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SermonDetails;
