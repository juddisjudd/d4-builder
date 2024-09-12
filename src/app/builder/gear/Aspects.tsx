'use client';

import * as React from 'react';
import { gearSlots } from '../../data/gearSlots';
import GearSlot from './components/GearSlot';
import SocketSlot from './components/SocketSlot';
import { useBuildContext } from '@/contexts/BuildContext';

const Aspects: React.FC = () => {
  const { buildState, updateAspect } = useBuildContext();
  const { selectedClass, aspects } = buildState;

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

  const renderSockets = (slotIndex: number) => {
    const slotLabel = slots[slotIndex].label;
    if (slotLabel === 'Gloves' || slotLabel === 'Boots') {
      return <div className="mt-2 h-10" />; // Spacer for gloves and boots
    }

    const slotType = getSlotType(slotLabel);
    const numSockets = getNumSockets(selectedClass, slotIndex);

    return (
      <div className="mt-2 flex h-10 space-x-1">
        {[...Array(numSockets)].map((_, socketIndex) => (
          <SocketSlot key={socketIndex} slotIndex={slotIndex} socketIndex={socketIndex} slotType={slotType} />
        ))}
      </div>
    );
  };

  const renderSlot = (slot: any, index: number, isRightSide: boolean) => (
    <div key={isRightSide ? index + 7 : index} className={`flex flex-col ${isRightSide ? 'items-end' : ''}`}>
      <GearSlot
        label={slot.label}
        imageSrc={slot.imageSrc}
        isPlaceholder={slot.isPlaceholder}
        isRightSide={isRightSide}
        selectedClass={selectedClass}
        index={isRightSide ? index + 7 : index}
        selections={aspects}
        onSelectionChange={updateAspect}
      />
      {!slot.isPlaceholder && renderSockets(isRightSide ? index + 7 : index)}
      {slot.isPlaceholder && <div className="mt-2 h-10" />}
    </div>
  );

  return (
    <div className="mt-4 flex justify-between px-10">
      <div className="flex flex-col space-y-4">{leftSlots.map((slot, index) => renderSlot(slot, index, false))}</div>
      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="flex h-[600px] w-[600px] items-center justify-center">
          <img
            src={`/images/misc/${selectedClass.toLowerCase()}.png`}
            alt={`${selectedClass} image`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col items-end space-y-4">
        {rightSlots.map((slot, index) => renderSlot(slot, index, true))}
      </div>
    </div>
  );
};

const getSlotType = (label: string | undefined): 'weapon' | 'armor' | 'jewelry' => {
  if (!label) return 'armor';
  if (['Helm', 'Chest Armor', 'Pants'].includes(label)) return 'armor';
  if (['Amulet', 'Ring 1', 'Ring 2'].includes(label)) return 'jewelry';
  return 'weapon';
};

const getNumSockets = (className: string, slotIndex: number): number => {
  const slotLabel = gearSlots[className.toLowerCase()][slotIndex].label;

  if (slotLabel && ['Amulet', 'Ring 1', 'Ring 2'].includes(slotLabel)) {
    return 1;
  }

  if (
    (className === 'Barbarian' || className === 'Rogue') &&
    (slotLabel === 'Dual-Wield Weapon 1' || slotLabel === 'Dual-Wield Weapon 2')
  ) {
    return 1;
  }

  if (slotLabel === 'Gloves' || slotLabel === 'Boots') {
    return 0;
  }

  return 2;
};

export default Aspects;
