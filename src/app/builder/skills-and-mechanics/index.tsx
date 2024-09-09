import React from 'react';
import { useBuildContext } from '@/contexts/BuildContext';
import BarbarianSkillsMechanics from './barbarian/BarbarianSkillsMechanics';
import DruidSkillsMechanics from './druid/DruidSkillsMechanics';
import NecromancerSkillsMechanics from './necromancer/NecromancerSkillsMechanics';
import RogueSkillsMechanics from './rogue/RogueSkillsMechanics';
import SorcererSkillsMechanics from './sorcerer/SorcererSkillsMechanics';
import SpiritbornSkillsMechanics from './spiritborn/SpiritbornSkillsMechanics';

const SkillsAndMechanics: React.FC = () => {
  const { buildState } = useBuildContext();
  const { selectedClass } = buildState;

  if (!selectedClass) {
    return null;
  }

  const renderClassMechanic = () => {
    switch (selectedClass.toLowerCase()) {
      case 'barbarian':
        return <BarbarianSkillsMechanics />;
      case 'druid':
        return <DruidSkillsMechanics />;
      case 'necromancer':
        return <NecromancerSkillsMechanics />;
      case 'rogue':
        return <RogueSkillsMechanics />;
      case 'sorcerer':
        return <SorcererSkillsMechanics />;
      case 'spiritborn':
        return <SpiritbornSkillsMechanics />;
      default:
        return null;
    }
  };

  return <div className="mt-8 flex flex-col items-center">{renderClassMechanic()}</div>;
};

export default SkillsAndMechanics;
