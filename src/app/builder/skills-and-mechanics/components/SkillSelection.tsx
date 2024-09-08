import React from 'react';
import SkillButton from './SkillButton';

interface SkillSelectionProps {
  skillNames: string[];
}

const SkillSelection: React.FC<SkillSelectionProps> = ({ skillNames }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Skills</h2>
      <div className="flex space-x-2">
        {skillNames.map((skillName, index) => (
          <SkillButton key={index} skillName={skillName} />
        ))}
      </div>
    </div>
  );
};

export default SkillSelection;