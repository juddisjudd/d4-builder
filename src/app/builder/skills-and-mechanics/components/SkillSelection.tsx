import React from 'react';
import SkillButton from './SkillButton';
import { useBuildContext } from '@/contexts/BuildContext';

const SkillSelection: React.FC = () => {
  const { buildState, updateSkill } = useBuildContext();
  const { selectedClass, selectedSkills } = buildState;

  if (!selectedClass) return null;

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Skills</h2>
      <div className="flex space-x-2">
        {[...Array(6)].map((_, index) => (
          <SkillButton
            key={index}
            selectedClass={selectedClass}
            onSelectSkill={(skill) => updateSkill(index, skill)}
            selectedSkill={selectedSkills[index]}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillSelection;
