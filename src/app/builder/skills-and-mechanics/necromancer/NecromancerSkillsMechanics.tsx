import React from 'react';
import SkillSelection from '../components/SkillSelection';
import BookOfTheDead from './components/BookOfTheDead';
import { useBuildContext } from '@/contexts/BuildContext';

const NecromancerSkillsMechanics: React.FC = () => {
  const { buildState } = useBuildContext();
  const { selectedClass } = buildState;

  if (selectedClass !== 'Necromancer') return null;

  return (
    <div className="mt-0 flex flex-col items-center">
      <SkillSelection />
      <BookOfTheDead />
    </div>
  );
};

export default NecromancerSkillsMechanics;
