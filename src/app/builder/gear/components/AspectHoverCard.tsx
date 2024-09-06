import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AspectData } from '../../../data/codex';

interface AspectHoverCardProps {
  aspect: AspectData;
  children: React.ReactNode;
}

const AspectHoverCard: React.FC<AspectHoverCardProps> = ({ aspect, children }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <img 
              src={`/images/aspects/${aspect.type.toLowerCase()}.png`}
              alt={aspect.name}
              className="w-[62px] h-[62px] object-contain"
            />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{aspect.name}</h4>
            <p className="text-sm text-muted-foreground">
              {aspect.type} - {aspect.class || "All Classes"}
            </p>
            <p className="text-sm">{aspect.description}</p>
            {aspect.filters && aspect.filters.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {aspect.filters.join(', ')}
              </p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AspectHoverCard;