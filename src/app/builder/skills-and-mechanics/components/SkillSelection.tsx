import React, { useState } from 'react';
import SkillButton from './SkillButton';

interface SkillSelectionProps {
  selectedClass: string;
}

const SkillSelection: React.FC<SkillSelectionProps> = ({ selectedClass }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(Array(6).fill(null));

  const handleSelectSkill = (skill: any, index: number) => {
    const newSelectedSkills = [...selectedSkills];
    newSelectedSkills[index] = skill.name;
    setSelectedSkills(newSelectedSkills);
  };

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Skills</h2>
      <div className="flex space-x-2">
        {Array.from({ length: 6 }, (_, i) => (
          <SkillButton
            key={i}
            selectedClass={selectedClass}
            onSelectSkill={(skill) => handleSelectSkill(skill, i)}
            selectedSkills={selectedSkills}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillSelection;
