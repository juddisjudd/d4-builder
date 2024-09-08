import React from 'react';
import { useBuildContext } from '@/contexts/BuildContext';
import BarbarianSkillsMechanics from './barbarian/BarbarianSkillsMechanics';
import SkillSelection from './components/SkillSelection';

const SkillsAndMechanics: React.FC = () => {
  const { buildState } = useBuildContext();
  const { selectedClass } = buildState;

  if (!selectedClass) {
    return null;
  }

  const skillNames = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6'];

  const renderClassMechanic = () => {
    switch (selectedClass.toLowerCase()) {
      case 'barbarian':
        return <BarbarianSkillsMechanics />;
      // Add other classes here as we implement them
      default:
        return <SkillSelection skillNames={skillNames} />;
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      {renderClassMechanic()}
    </div>
  );
};

export default SkillsAndMechanics;