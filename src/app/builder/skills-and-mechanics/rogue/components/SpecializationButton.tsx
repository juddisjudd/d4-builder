import React from 'react';
import { Button } from '@/components/ui/button';
import { Specialization } from '../data/specializations';
import SpecializationHoverCard from './SpecializationHoverCard';

interface SpecializationButtonProps {
  specialization: Specialization;
  isSelected: boolean;
  onSelect: () => void;
}

const SpecializationButton: React.FC<SpecializationButtonProps> = ({ specialization, isSelected, onSelect }) => {
  const imagePath = `/images/skills/rogue/specializations/${specialization.name.toLowerCase().replace(/ /g, '_')}${
    isSelected ? '_specialized' : ''
  }.png`;

  return (
    <SpecializationHoverCard specialization={specialization}>
      <Button variant="outline" size="icon" className={`h-16 w-16 p-0 ${isSelected ? '' : ''}`} onClick={onSelect}>
        <img src={imagePath} alt={specialization.name} className="h-full w-full object-contain" />
      </Button>
    </SpecializationHoverCard>
  );
};

export default SpecializationButton;
