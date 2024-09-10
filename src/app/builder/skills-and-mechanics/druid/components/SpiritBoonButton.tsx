import React from 'react';
import { Button } from '@/components/ui/button';
import { SpiritBoon } from '../data/spiritboons';
import SpiritBoonHoverCard from './SpiritBoonHoverCard';

interface SpiritBoonButtonProps {
  boon: SpiritBoon;
  isSelected: boolean;
  onSelect: () => void;
}

const SpiritBoonButton: React.FC<SpiritBoonButtonProps> = ({ boon, isSelected, onSelect }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image for boon: ${boon.name}`, e);
  };

  return (
    <SpiritBoonHoverCard boon={boon}>
      <Button
        variant="outline"
        className={`h-16 w-16 rounded-full p-0 ${isSelected ? 'ring-2 ring-yellow-500' : ''}`}
        onClick={onSelect}
      >
        <img
          src={boon.icon}
          alt={boon.name}
          className="h-14 w-14 rounded-full object-contain"
          onError={handleImageError}
        />
      </Button>
    </SpiritBoonHoverCard>
  );
};

export default SpiritBoonButton;
