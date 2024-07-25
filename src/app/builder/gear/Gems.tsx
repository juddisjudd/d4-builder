'use client';

import * as React from 'react';
import GemSlot from './components/GemSlot';

interface GemSectionProps {
  selectedClass: string | null;
}

const gems = [
  {
    name: 'Amethyst',
    weapon: '18% Damage Over Time',
    armor: '100 Strength',
    jewelry: '45% Shadow Resistance',
  },
  {
    name: 'Emerald',
    weapon: '25% Critical Strike Damage',
    armor: '100 Dexterity',
    jewelry: '45% Poison Resistance',
  },
  {
    name: 'Ruby',
    weapon: '54% Overpower Damage',
    armor: '9% Maximum Life',
    jewelry: '45% Fire Resistance',
  },
  {
    name: 'Topaz',
    weapon: '45% Basic Skill Damage',
    armor: '100 Intelligence',
    jewelry: '45% Lightning Resistance',
  },
  {
    name: 'Sapphire',
    weapon: '20% Vulnerable Damage',
    armor: '100 Willpower',
    jewelry: '45% Cold Resistance',
  },
  {
    name: 'Diamond',
    weapon: '35% Ultimate Damage',
    armor: '11% Barrier Generation',
    jewelry: '8% Resistance to All Elements',
  },
  {
    name: 'Skull',
    weapon: '48 Life On Kill',
    armor: '15% Healing Received',
    jewelry: '525 Armor',
  },
];

const GemSection: React.FC<GemSectionProps> = ({ selectedClass }) => {
  if (!selectedClass) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-center text-xl font-bold">Gems</h2>
      <div className="mt-4 flex justify-center space-x-4">
        <GemSlot label="Weapon" slotType="weapon" gems={gems} />
        <GemSlot label="Armor" slotType="armor" gems={gems} />
        <GemSlot label="Amulet" slotType="jewelry" gems={gems} />
        <GemSlot label="Ring 1" slotType="jewelry" gems={gems} />
        <GemSlot label="Ring 2" slotType="jewelry" gems={gems} />
      </div>
    </div>
  );
};

export default GemSection;