import React, { useState, useEffect } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { SpiritData } from '../data/spirithall';

interface SpiritHoverCardProps {
  spirit: string;
  data: SpiritData;
  passiveType: 'Primary Passive' | 'Secondary Passive';
  children: React.ReactNode;
}

const SpiritHoverCard: React.FC<SpiritHoverCardProps> = ({ spirit, data, passiveType, children }) => {
  const [isOpen, setIsOpen] = useState(false);

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
      <HoverCardContent className="w-80">
        <h3 className="mb-2 font-bold">
          {spirit} Spirit - {passiveType}
        </h3>
        <p>{data[passiveType]}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default SpiritHoverCard;
