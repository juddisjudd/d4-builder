import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { SpiritBoon } from '../data/spiritboons';

interface SpiritBoonHoverCardProps {
  boon: SpiritBoon;
  children: React.ReactNode;
}

const SpiritBoonHoverCard: React.FC<SpiritBoonHoverCardProps> = ({ boon, children }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <h3 className="mb-2 text-lg font-semibold">{boon.name}</h3>
        {boon.description.map((desc, index) => (
          <p key={index} className="mb-2 text-sm">
            {desc.split(/(\{[^}]+\})/).map((part, i) => {
              if (part.startsWith('{') && part.endsWith('}')) {
                const key = part.slice(1, -1);
                return (
                  <span key={i} className="text-yellow-400">
                    {boon.values[key]}
                  </span>
                );
              }
              return part;
            })}
          </p>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
};

export default SpiritBoonHoverCard;
