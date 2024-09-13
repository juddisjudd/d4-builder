import React, { useState, useEffect } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { AspectData } from '../../../data/codex';
import { getAspectImagePath } from '../../utils/imagePathUtils';

interface AspectHoverCardProps {
  aspect: AspectData;
  children: React.ReactNode;
}

const AspectHoverCard: React.FC<AspectHoverCardProps> = ({ aspect, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const imageSrc = getAspectImagePath(aspect.name, aspect.class, aspect.type);

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
      <HoverCardContent className="w-96">
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <img
              src={imageSrc}
              alt={aspect.name}
              className="h-[62px] w-[62px] object-contain"
              onError={(e) => {
                const imgElement = e.currentTarget as HTMLImageElement;
                imgElement.style.display = 'none';
              }}
            />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{aspect.name}</h4>
            <p className="text-sm text-muted-foreground">
              {aspect.type} - {aspect.class || 'All Classes'}
            </p>
            <p className="text-sm">{aspect.description}</p>
            {aspect.filters && aspect.filters.length > 0 && (
              <p className="text-xs text-muted-foreground">{aspect.filters.join(', ')}</p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AspectHoverCard;