
import React, { useState } from 'react';
import { courses } from '../data/courses';
import CourseList from '../components/CourseList';
import { Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AllCourses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const categories = Array.from(new Set(courses.map(course => course.category)));
  const types = Array.from(new Set(courses.map(course => course.type)));

  const filteredCourses = courses
    .filter(course => !selectedCategory || course.category === selectedCategory)
    .filter(course => !selectedType || course.type === selectedType);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <div className="inline-block bg-devotion-purple-100 p-3 rounded-full mb-3">
          <Music className="h-6 w-6 text-devotion-purple-600" />
        </div>
        <h1 className="text-3xl font-bold">Tous les cours</h1>
        <p className="text-muted-foreground mt-2">
          Explorez notre collection complète de cours
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Catégories</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            size="sm"
          >
            Toutes
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
              className={cn(
                selectedCategory === category ? "bg-devotion-purple-600" : ""
              )}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
        
        <h3 className="text-sm font-medium mb-2">Types</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedType === null ? "default" : "outline"}
            onClick={() => setSelectedType(null)}
            size="sm"
          >
            Tous
          </Button>
          {types.map(type => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              size="sm"
              className={cn(
                selectedType === type ? "bg-devotion-purple-600" : ""
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <CourseList 
        courses={filteredCourses}
        title={`${filteredCourses.length} cours trouvés`}
        emptyMessage="Aucun cours ne correspond à ces critères."
      />
    </div>
  );
};

export default AllCourses;
