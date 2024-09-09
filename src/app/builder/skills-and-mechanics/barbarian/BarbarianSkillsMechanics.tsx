import React from 'react';
import SkillSelection from '../components/SkillSelection';
import TechniqueButton from './components/TechniqueButton';
import { Separator } from '@/components/ui/separator';

const BarbarianSkillsMechanics: React.FC = () => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="flex items-end space-x-4">
        <SkillSelection selectedClass="Barbarian" />
        <Separator orientation="vertical" className="h-16" />
        <div>
          <h2 className="mb-2 text-xl font-bold">Technique</h2>
          <TechniqueButton />
        </div>
      </div>
    </div>
  );
};

export default BarbarianSkillsMechanics;
