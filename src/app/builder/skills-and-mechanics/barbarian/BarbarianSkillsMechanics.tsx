import React from 'react';
import SkillSelection from '../components/SkillSelection';
import TechniqueButton from './components/TechniqueButton';
import { Separator } from "@/components/ui/separator";

const BarbarianSkillsMechanics: React.FC = () => {
  const skillNames = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6'];

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="flex items-end space-x-4">
        <SkillSelection skillNames={skillNames} />
        <Separator orientation="vertical" className="h-16" />
        <div>
          <h2 className="text-xl font-bold mb-2">Technique</h2>
          <TechniqueButton />
        </div>
      </div>
    </div>
  );
};

export default BarbarianSkillsMechanics;