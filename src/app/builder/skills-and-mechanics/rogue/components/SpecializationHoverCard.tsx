import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Specialization } from '../data/specializations';

interface SpecializationHoverCardProps {
  specialization: Specialization;
  children: React.ReactNode;
}

const SpecializationHoverCard: React.FC<SpecializationHoverCardProps> = ({ specialization, children }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <h3 className="mb-2 text-lg font-semibold">{specialization.name}</h3>
        <p className="text-sm">
          {specialization.description.split(/(\{[^}]+\})/).map((part, index) => {
            if (part.startsWith('{') && part.endsWith('}')) {
              const key = part.slice(1, -1);
              return (
                <span key={index} className="text-yellow-400">
                  {specialization.values?.[key]}
                </span>
              );
            }
            return part;
          })}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default SpecializationHoverCard;
