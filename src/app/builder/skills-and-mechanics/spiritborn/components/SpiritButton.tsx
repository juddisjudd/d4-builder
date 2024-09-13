import React from 'react';
import { Button } from '@/components/ui/button';
import { SpiritData } from '../data/spirithall';
import SpiritHoverCard from './SpiritHoverCard';

interface SpiritButtonProps {
  spirit: string;
  data: SpiritData;
  isSelected: boolean;
  isPrimary: boolean;
  onSelect: () => void;
}

const SpiritButton: React.FC<SpiritButtonProps> = ({ spirit, data, isSelected, isPrimary, onSelect }) => {
  const imageSrc = `/images/skills/spiritborn/spirithall/${spirit.toLowerCase()}${isSelected ? '_selected' : ''}.png`;
  const passiveType = isPrimary ? 'Primary Passive' : 'Secondary Passive';

  return (
    <SpiritHoverCard spirit={spirit} data={data} passiveType={passiveType}>
      <Button variant="link" size="lg" className={`m-2 p-0 ${isSelected ? '' : ''}`} onClick={onSelect}>
        <img src={imageSrc} alt={spirit} className="h-16 w-16" />
      </Button>
    </SpiritHoverCard>
  );
};

export default SpiritButton;
