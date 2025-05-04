
import React from 'react';
import { Sermon } from '../types/sermon';
import SermonCard from './SermonCard';

interface SermonListProps {
  sermons: Sermon[];
  title?: string;
  emptyMessage?: string;
}

const SermonList: React.FC<SermonListProps> = ({ 
  sermons, 
  title = 'Prédications', 
  emptyMessage = 'Aucune prédication disponible'
}) => {
  return (
    <div className="py-4">
      {title && (
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
      )}
      
      {sermons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sermons.map(sermon => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SermonList;
