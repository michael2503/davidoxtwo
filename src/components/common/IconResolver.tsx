import React from 'react';
import * as Icons from 'lucide-react';

interface IconResolverProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconResolver: React.FC<IconResolverProps> = ({ name, className = 'w-6 h-6', size }) => {
  const IconComponent = (Icons as Record<string, any>)[name] || Icons.Code;
  return <IconComponent className={className} size={size} />;
};
