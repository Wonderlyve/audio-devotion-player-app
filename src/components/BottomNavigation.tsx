
import React from 'react';
import { Home, BookOpen, Heart, Music, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Accueil', path: '/' },
    { icon: BookOpen, label: 'Tutoriels', path: '/tutorials' },
    { icon: Music, label: 'Cours', path: '/courses' },
    { icon: Heart, label: 'Favoris', path: '/favorites' },
    { icon: User, label: 'Profil', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <ul className="flex justify-around">
        {navItems.map((item) => (
          <li key={item.path} className="flex-1">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center py-2 px-1',
                  isActive ? 'text-devotion-purple-700' : 'text-gray-600'
                )
              }
            >
              <item.icon className="mb-1 h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigation;
