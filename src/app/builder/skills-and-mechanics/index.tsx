import React from 'react';
import { useBuildContext } from '@/contexts/BuildContext';
import BarbarianSkillsMechanics from './barbarian/BarbarianSkillsMechanics';

const SkillsAndMechanics: React.FC = () => {
  const { buildState } = useBuildContext();
  const { selectedClass } = buildState;

  if (!selectedClass) {
    return null;
  }

  switch (selectedClass.toLowerCase()) {
    case 'barbarian':
      return <BarbarianSkillsMechanics />;
    // Add other classes here as we implement them
    default:
      return null;
  }
};

export default SkillsAndMechanics;