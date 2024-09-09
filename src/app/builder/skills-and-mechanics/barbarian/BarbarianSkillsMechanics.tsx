import React from 'react';
import SkillSelection from '../components/SkillSelection';
import TechniqueButton from './components/TechniqueButton';
import { Separator } from '@/components/ui/separator';
import { useBuildContext } from '@/contexts/BuildContext';

const BarbarianSkillsMechanics: React.FC = () => {
  const { buildState } = useBuildContext();
  const { selectedClass } = buildState;

  if (selectedClass !== 'Barbarian') return null;

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="flex items-end space-x-4">
        <SkillSelection />
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
