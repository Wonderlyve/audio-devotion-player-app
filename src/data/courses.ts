
import { Course } from '../types/course';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Bases du piano pour débutants',
    instructor: 'Prof. Marie Dupont',
    date: '2023-04-15',
    duration: '28:45',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    description: 'Apprenez les bases fondamentales du piano avec ce tutoriel idéal pour les débutants complets.',
    category: 'piano',
    level: 'débutant',
    type: 'tutoriel'
  },
  {
    id: '2',
    title: 'Techniques avancées de guitare',
    instructor: 'Prof. Jean Martin',
    date: '2023-03-28',
    duration: '35:10',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    description: 'Perfectionnez vos techniques de jeu avec ces exercices avancés pour guitaristes.',
    category: 'guitare',
    level: 'avancé',
    type: 'exercice'
  },
  {
    id: '3',
    title: 'Maîtriser votre voix',
    instructor: 'Céline Vocale',
    date: '2023-02-10',
    duration: '42:30',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    description: 'Techniques vocales essentielles pour développer votre tessiture et améliorer votre chant.',
    category: 'voix',
    level: 'intermédiaire',
    type: 'tutoriel'
  },
  {
    id: '4',
    title: 'Rythmes fondamentaux à la batterie',
    instructor: 'Alex Tambour',
    date: '2023-01-22',
    duration: '31:15',
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    description: 'Maîtrisez les patterns rythmiques essentiels pour devenir un batteur complet.',
    category: 'batterie',
    level: 'débutant',
    type: 'exercice'
  },
  {
    id: '5',
    title: 'Techniques de slap pour bassistes',
    instructor: 'Marc Basse',
    date: '2022-12-05',
    duration: '38:22',
    imageUrl: 'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    description: 'Perfectionnez votre technique de slap et donnez du groove à vos lignes de basse.',
    category: 'basse',
    level: 'intermédiaire',
    type: 'tutoriel'
  },
  {
    id: '6',
    title: 'Carrière dans l\'industrie musicale',
    instructor: 'Sophie Carrière',
    date: '2022-11-18',
    duration: '33:45',
    imageUrl: 'https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    description: 'Conseils et stratégies pour développer une carrière réussie dans l\'industrie de la musique.',
    category: 'autre',
    type: 'carrière'
  },
  {
    id: '7',
    title: 'Défi de composition en 7 jours',
    instructor: 'Lucas Compositeur',
    date: '2023-05-20',
    duration: '25:15',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    description: 'Relevez le défi et créez une composition complète en seulement une semaine!',
    category: 'autre',
    level: 'intermédiaire',
    type: 'défi'
  }
];
