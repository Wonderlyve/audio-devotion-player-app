
import React, { useState } from 'react';
import { sermons } from '../data/sermons';
import SermonList from '../components/SermonList';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const AllSermons: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSermons = sermons.filter(sermon => 
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sermon.category && sermon.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Toutes les Prédications</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Rechercher par titre, prédicateur ou catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <SermonList 
        sermons={filteredSermons} 
        title=""
        emptyMessage="Aucune prédication ne correspond à votre recherche."
      />
    </div>
  );
};

export default AllSermons;
