import React from 'react';
import SkillButton from './components/SkillButton';
import TechniqueButton from './components/TechniqueButton';

const BarbarianSkillsMechanics: React.FC = () => {
  const skillNames = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6'];

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Skills</h2>
        <h2 className="text-xl font-bold">Technique</h2>
      </div>
      <div className="flex justify-between">
        <div className="flex space-x-2">
          {skillNames.map((skillName, index) => (
            <SkillButton key={index} skillName={skillName} />
          ))}
        </div>
        <TechniqueButton />
      </div>
    </div>
  );
};

export default BarbarianSkillsMechanics;