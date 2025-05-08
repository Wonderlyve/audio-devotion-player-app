
import React from 'react';
import { courses } from '../data/courses';
import CourseList from '../components/CourseList';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CourseCard from '../components/CourseCard';

const Index: React.FC = () => {
  const featuredCourses = courses.slice(0, 3);
  const recentCourses = [...courses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 6);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      <section className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-devotion-purple-800 mb-2">
            GM cademy
          </h1>
          <p className="text-muted-foreground">
            Apprenez à jouer de la musique avec nos cours en ligne
          </p>
        </div>

        <Carousel className="mb-8">
          <CarouselContent>
            {featuredCourses.map(course => (
              <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
                <CourseCard course={course} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="mb-8">
        <CourseList 
          courses={courses.filter(course => course.type === 'tutoriel')} 
          title="Tutoriels"
          viewAllLink="/tutorials"
        />
      </section>

      <section className="mb-8">
        <CourseList 
          courses={courses.filter(course => course.type === 'exercice')} 
          title="Exercices"
          viewAllLink="/exercises"
        />
      </section>

      <section>
        <CourseList 
          courses={courses.filter(course => course.type === 'carrière' || course.type === 'défi')}
          title="Carrière et défis" 
          viewAllLink="/career-challenges"
        />
      </section>
    </div>
  );
};

export default Index;
