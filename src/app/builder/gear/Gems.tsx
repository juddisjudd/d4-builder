'use client';

import * as React from 'react';
import GemSlot from './components/GemSlot';
import { useBuildContext } from '@/contexts/BuildContext';
import { gems } from './data/gems';

const GemSection: React.FC = () => {
  const { buildState, updateGem } = useBuildContext();
  const { selectedClass, gems: selectedGems } = buildState;

  if (!selectedClass) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-center text-xl font-bold">Gems</h2>
      <div className="mt-4 flex justify-center space-x-4">
        <GemSlot label="Weapon" slotType="weapon" gems={gems} selectedGem={selectedGems[0]} onSelectGem={(gem) => updateGem(0, gem)} />
        <GemSlot label="Armor" slotType="armor" gems={gems} selectedGem={selectedGems[1]} onSelectGem={(gem) => updateGem(1, gem)} />
        <GemSlot label="Amulet" slotType="jewelry" gems={gems} selectedGem={selectedGems[2]} onSelectGem={(gem) => updateGem(2, gem)} />
        <GemSlot label="Ring 1" slotType="jewelry" gems={gems} selectedGem={selectedGems[3]} onSelectGem={(gem) => updateGem(3, gem)} />
        <GemSlot label="Ring 2" slotType="jewelry" gems={gems} selectedGem={selectedGems[4]} onSelectGem={(gem) => updateGem(4, gem)} />
      </div>
    </div>
  );
};

export default GemSection;