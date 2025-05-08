
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { usePlayer } from '../context/PlayerContext';
import { useFavorites } from '../context/FavoritesContext';
import { Button } from '@/components/ui/button';
import { Play, Pause, Heart, Download, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import CourseList from '../components/CourseList';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id);
  const { currentCourse, isPlaying, playCourse, pauseCourse, resumeCourse } = usePlayer();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!course) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Cours non trouvé</h1>
        <p className="mb-6">Le cours que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link to="/courses">
          <Button>Retour aux cours</Button>
        </Link>
      </div>
    );
  }
  
  const isCurrentCourse = currentCourse?.id === course.id;
  
  const handlePlayButton = () => {
    if (isCurrentCourse) {
      if (isPlaying) {
        pauseCourse();
      } else {
        resumeCourse();
      }
    } else {
      playCourse(course);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: `Découvrez ce cours: ${course.title} par ${course.instructor}`,
        url: window.location.href
      }).catch(err => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Lien copié",
          description: "Le lien a été copié dans le presse-papier."
        });
      });
    }
  };

  const handleDownload = () => {
    // Simulation de téléchargement
    toast({
      title: "Téléchargement démarré",
      description: "Le cours sera bientôt disponible hors ligne."
    });
  };
  
  const similarCourses = courses
    .filter(c => c.id !== course.id && (c.category === course.category || c.type === course.type))
    .slice(0, 3);

  return (
    <div className="pb-16">
      <div className="relative w-full aspect-video bg-black">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button 
            className="rounded-full w-16 h-16 bg-devotion-purple-600 hover:bg-devotion-purple-700"
            onClick={handlePlayButton}
          >
            {isCurrentCourse && isPlaying ? (
              <Pause size={28} fill="white" />
            ) : (
              <Play size={28} className="ml-1" fill="white" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">{course.instructor}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownload}
              title="Télécharger"
            >
              <Download size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              title="Partager"
            >
              <Share2 size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(course)}
              title={isFavorite(course.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
              className={isFavorite(course.id) ? "text-red-500 border-red-200" : ""}
            >
              <Heart size={18} className={isFavorite(course.id) ? "fill-red-500" : ""} />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-devotion-purple-100 text-devotion-purple-800 text-sm px-3 py-1 rounded-full">
            {course.category}
          </span>
          {course.level && (
            <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
              {course.level}
            </span>
          )}
          <span className="bg-devotion-gold-100 text-devotion-gold-600 text-sm px-3 py-1 rounded-full">
            {course.type}
          </span>
          <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
            {course.duration}
          </span>
        </div>
        
        <div className="mb-8 prose max-w-none">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{course.description}</p>
        </div>
        
        {similarCourses.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Cours similaires</h2>
            <CourseList courses={similarCourses} title="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
