
import React, { useState } from 'react';
import { courses } from '../data/courses';
import CourseList from '../components/CourseList';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Tutorials: React.FC = () => {
  const tutorialCourses = courses.filter(course => course.type === 'tutoriel');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(
    new Set(tutorialCourses.map(course => course.category))
  );

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <div className="inline-block bg-devotion-purple-100 p-3 rounded-full mb-3">
          <BookOpen className="h-6 w-6 text-devotion-purple-600" />
        </div>
        <h1 className="text-3xl font-bold">Tutoriels</h1>
        <p className="text-muted-foreground mt-2">
          Apprenez de nouvelles compétences musicales
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          size="sm"
        >
          Tous
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

      <CourseList 
        courses={tutorialCourses}
        title=""
        category={selectedCategory || undefined}
        emptyMessage="Aucun tutoriel disponible dans cette catégorie."
      />
    </div>
  );
};

export default Tutorials;
