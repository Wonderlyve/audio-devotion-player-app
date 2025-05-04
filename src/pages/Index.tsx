
import React from 'react';
import { sermons } from '../data/sermons';
import SermonList from '../components/SermonList';

const Index: React.FC = () => {
  const featuredSermons = sermons.slice(0, 3);
  const recentSermons = [...sermons].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 6);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      <section className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-devotion-purple-800 mb-2">
            Paroles de Vie
          </h1>
          <p className="text-muted-foreground">
            Écoutez et méditez sur la Parole de Dieu
          </p>
        </div>
      </section>

      <section className="mb-8">
        <SermonList 
          sermons={featuredSermons} 
          title="Prédications en Vedette"
        />
      </section>

      <section>
        <SermonList 
          sermons={recentSermons} 
          title="Prédications Récentes"
        />
      </section>
    </div>
  );
};

export default Index;
