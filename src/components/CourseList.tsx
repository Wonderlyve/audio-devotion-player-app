
import React from 'react';
import { Course } from '../types/course';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface CourseListProps {
  courses: Course[];
  title: string;
  viewAllLink?: string;
  emptyMessage?: string;
  category?: string;
  type?: string;
}

const CourseList: React.FC<CourseListProps> = ({ 
  courses, 
  title, 
  viewAllLink,
  emptyMessage = "Aucun cours disponible",
  category,
  type
}) => {
  // Filtrer les cours si une catégorie ou un type est spécifié
  const filteredCourses = courses
    .filter(course => !category || course.category === category)
    .filter(course => !type || course.type === type);

  return (
    <section className="mb-8">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-devotion-purple-800">{title}</h2>
          {viewAllLink && (
            <Link to={viewAllLink}>
              <Button variant="ghost" size="sm" className="text-devotion-purple-600 font-medium">
                Voir tout <ChevronRight size={16} />
              </Button>
            </Link>
          )}
        </div>
      )}
      
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-md">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
};

export default CourseList;
