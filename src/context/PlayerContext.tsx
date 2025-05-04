
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Sermon } from '../types/sermon';

interface PlayerContextProps {
  currentSermon: Sermon | null;
  isPlaying: boolean;
  playSermon: (sermon: Sermon) => void;
  pauseSermon: () => void;
  resumeSermon: () => void;
  stopSermon: () => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const playSermon = (sermon: Sermon) => {
    if (audioElement) {
      audioElement.pause();
    }

    const audio = new Audio(sermon.audioUrl);
    audio.play().catch(error => console.error("Error playing audio:", error));
    setAudioElement(audio);
    setCurrentSermon(sermon);
    setIsPlaying(true);

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
  };

  const pauseSermon = () => {
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const resumeSermon = () => {
    if (audioElement) {
      audioElement.play().catch(error => console.error("Error resuming audio:", error));
      setIsPlaying(true);
    }
  };

  const stopSermon = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
      setCurrentSermon(null);
      setAudioElement(null);
    }
  };

  const value = {
    currentSermon,
    isPlaying,
    playSermon,
    pauseSermon,
    resumeSermon,
    stopSermon
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};
