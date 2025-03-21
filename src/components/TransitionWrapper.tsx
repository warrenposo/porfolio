
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface TransitionWrapperProps {
  children: React.ReactNode;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('animate-fade-in');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('animate-fade-out');
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'animate-fade-out') {
      setTransitionStage('animate-fade-in');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={`${transitionStage} min-h-[calc(100vh-4rem)]`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
