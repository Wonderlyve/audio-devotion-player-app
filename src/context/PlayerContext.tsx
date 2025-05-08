
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '../types/course';

interface PlayerContextProps {
  currentCourse: Course | null;
  isPlaying: boolean;
  playCourse: (course: Course) => void;
  pauseCourse: () => void;
  resumeCourse: () => void;
  stopCourse: () => void;
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
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  const playCourse = (course: Course) => {
    if (videoElement) {
      videoElement.pause();
    }

    const video = document.createElement('video');
    video.src = course.videoUrl;
    video.play().catch(error => console.error("Error playing video:", error));
    setVideoElement(video);
    setCurrentCourse(course);
    setIsPlaying(true);

    video.addEventListener('ended', () => {
      setIsPlaying(false);
    });
  };

  const pauseCourse = () => {
    if (videoElement) {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  const resumeCourse = () => {
    if (videoElement) {
      videoElement.play().catch(error => console.error("Error resuming video:", error));
      setIsPlaying(true);
    }
  };

  const stopCourse = () => {
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
      setIsPlaying(false);
      setCurrentCourse(null);
      setVideoElement(null);
    }
  };

  const value = {
    currentCourse,
    isPlaying,
    playCourse,
    pauseCourse,
    resumeCourse,
    stopCourse
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};
