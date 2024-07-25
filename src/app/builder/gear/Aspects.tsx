'use client';

import * as React from 'react';
import { useState } from 'react';
import { gearSlots } from './data/gearSlots';
import GearSlot from './components/GearSlot';
import { AspectData } from './data/codex';
import { UniqueData } from './data/uniques';
import { Toaster } from 'sonner';

interface AspectsProps {
  selectedClass: string | null;
}

const Aspects: React.FC<AspectsProps> = ({ selectedClass }) => {
  const [selections, setSelections] = useState<(AspectData | UniqueData | null)[]>(Array(14).fill(null));

  if (!selectedClass) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-lg text-white">Please select a class to view gear slots.</div>
      </div>
    );
  }

  const slots = gearSlots[selectedClass.toLowerCase()];
  const leftSlots = slots.slice(0, 7);
  const rightSlots = slots.slice(7, 14);

  const handleSelectionChange = (index: number, item: AspectData | UniqueData | null) => {
    setSelections((prev) => {
      const newSelections = [...prev];
      newSelections[index] = item;
      return newSelections;
    });
  };

  return (
    <div className="mt-4 flex justify-between px-10">
      <Toaster />
      <div className="flex flex-col space-y-4">
        {leftSlots.map((slot, index) => (
          <GearSlot
            key={index}
            label={slot.label}
            imageSrc={slot.imageSrc}
            isPlaceholder={slot.isPlaceholder}
            selectedClass={selectedClass}
            index={index}
            selections={selections}
            onSelectionChange={handleSelectionChange}
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
            selections={selections}
            onSelectionChange={handleSelectionChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Aspects;
