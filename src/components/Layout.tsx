
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import MiniPlayer from './MiniPlayer';
import { usePlayer } from '../context/PlayerContext';

const Layout: React.FC = () => {
  const { currentSermon } = usePlayer();
  
  return (
    <div className="pb-16 min-h-screen bg-background">
      <main className={currentSermon ? 'pb-16' : ''}>
        <Outlet />
      </main>
      {currentSermon && <MiniPlayer />}
      <BottomNavigation />
    </div>
  );
};

export default Layout;
