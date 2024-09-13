import React, { useState, useEffect } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { UniqueData } from '../../../data/uniques';
import { getUniqueImagePath } from '../../utils/imagePathUtils';

interface UniqueHoverCardProps {
  unique: UniqueData;
  children: React.ReactNode;
}

const UniqueHoverCard: React.FC<UniqueHoverCardProps> = ({ unique, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const imageSrc = getUniqueImagePath(unique.type, unique.name);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80 border-[#424242] bg-[#141414] text-white">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className={`text-lg font-semibold ${unique.mythic ? 'text-purple-400' : 'text-yellow-400'}`}>
              {unique.name}
            </h4>
            <img
              src={imageSrc}
              alt={unique.name}
              className="h-[75px] w-[75px] object-contain"
              onError={(e) => {
                console.error('Failed to load image:', (e.target as HTMLImageElement).src);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <p className={`text-sm ${unique.mythic ? 'text-purple-300' : 'text-yellow-300'}`}>
            {unique.mythic ? 'Mythic ' : ''}
            {unique.type}
          </p>
          {unique.secondary_stats && (
            <ul className="text-sm text-gray-300">
              {unique.secondary_stats.map((stat, index) => (
                <li key={index}>• {stat}</li>
              ))}
            </ul>
          )}
          {unique.terciary_stats && (
            <ul className="text-sm text-gray-300">
              {unique.terciary_stats.map((stat, index) => (
                <li key={index}>• {stat}</li>
              ))}
            </ul>
          )}
          <p className="text-sm">
            <span className="text-blue-300">{unique.effect.split(':')[0]}:</span>
            {unique.effect.split(':')[1]}
          </p>
          {unique.flavor && <p className="text-xs italic text-gray-400">`{unique.flavor}`</p>}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UniqueHoverCard;