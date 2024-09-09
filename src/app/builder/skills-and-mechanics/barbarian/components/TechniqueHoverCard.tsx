import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Technique } from '../data/techniques';

interface TechniqueHoverCardProps {
  technique: Technique | null;
  children: React.ReactNode;
}

const TechniqueHoverContent: React.FC<{ technique: Technique }> = ({ technique }) => (
  <div className="max-w-xl p-4">
    <h3 className="mb-2 text-lg font-semibold">{technique.name}</h3>
    {technique.description.map((desc, index) => (
      <p key={index} className="mb-2 text-sm">
        {desc.split(/(\{[^}]+\})/).map((part, i) => {
          if (part.startsWith('{') && part.endsWith('}')) {
            const key = part.slice(1, -1);
            return (
              <span key={i} className="text-yellow-400">
                {technique.values[key]}
              </span>
            );
          }
          return part;
        })}
      </p>
    ))}
  </div>
);

const TechniqueHoverCard: React.FC<TechniqueHoverCardProps> = ({ technique, children }) => (
  <HoverCard>
    <HoverCardTrigger asChild>{children}</HoverCardTrigger>
    {technique && (
      <HoverCardContent className="w-[500px] max-w-[600px]">
        <TechniqueHoverContent technique={technique} />
      </HoverCardContent>
    )}
  </HoverCard>
);

export default TechniqueHoverCard;
