'use client';

import * as React from 'react';
import { gearSlots } from '../../data/gearSlots';
import GearSlot from './components/GearSlot';
import { useBuildContext } from '@/contexts/BuildContext';

const Aspects: React.FC = () => {
  const { buildState, updateAspect } = useBuildContext();
  const { selectedClass, aspects } = buildState;

  if (!selectedClass) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-white text-lg">
          Please select a class to view gear slots.
        </div>
      </div>
    );
  }

  const slots = gearSlots[selectedClass.toLowerCase()];
  const leftSlots = slots.slice(0, 7);
  const rightSlots = slots.slice(7, 14);

  return (
    <div className="flex justify-between px-10 mt-4">
      <div className="flex flex-col space-y-4">
        {leftSlots.map((slot, index) => (
          <GearSlot 
            key={index} 
            label={slot.label} 
            imageSrc={slot.imageSrc} 
            isPlaceholder={slot.isPlaceholder} 
            selectedClass={selectedClass} 
            index={index}
            selections={aspects}
            onSelectionChange={updateAspect}
          />
        ))}
      </div>
      <div className="flex flex-col space-y-4">
        {rightSlots.map((slot, index) => (
          <GearSlot 
            key={index + 7} 
            label={slot.label} 
            imageSrc={slot.imageSrc} 
            isPlaceholder={slot.isPlaceholder} 
            isRightSide 
            selectedClass={selectedClass} 
            index={index + 7}
            selections={aspects}
            onSelectionChange={updateAspect}
          />
        ))}
      </div>
    </div>
  );
};

export default Aspects;