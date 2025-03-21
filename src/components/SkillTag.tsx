
import React from 'react';
import { cn } from '@/lib/utils';

interface SkillTagProps {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  className?: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ name, level = 'intermediate', className }) => {
  const getBgColor = () => {
    switch (level) {
      case 'beginner':
        return 'bg-secondary text-secondary-foreground';
      case 'intermediate':
        return 'bg-accent text-accent-foreground';
      case 'advanced':
        return 'bg-primary/10 text-primary';
      case 'expert':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };
  
  return (
    <div className={cn(
      "px-3 py-1.5 rounded-full text-xs font-medium inline-block",
      getBgColor(),
      className
    )}>
      {name}
    </div>
  );
};

export default SkillTag;
