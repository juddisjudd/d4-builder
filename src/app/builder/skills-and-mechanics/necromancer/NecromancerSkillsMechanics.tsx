import React from 'react';
import SkillSelection from '../components/SkillSelection';
import BookOfTheDead from './components/BookOfTheDead';
import { useBuildContext } from '@/contexts/BuildContext';
import { Separator } from '@/components/ui/separator';

const NecromancerSkillsMechanics: React.FC = () => {
  const { buildState } = useBuildContext();
  const { selectedClass } = buildState;

  if (selectedClass !== 'Necromancer') return null;

  return (
    <div className="mt-8 flex flex-col items-center">
      <Separator className="my-4" orientation="horizontal" />
      <SkillSelection />
      <Separator className="my-4" orientation="horizontal" />
      <BookOfTheDead />
    </div>
  );
};

export default NecromancerSkillsMechanics;
