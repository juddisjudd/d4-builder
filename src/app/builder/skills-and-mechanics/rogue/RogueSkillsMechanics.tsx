import React from 'react';
import SkillSelection from '../components/SkillSelection';
import { useBuildContext } from '@/contexts/BuildContext';
import { specializations } from './data/specializations';
import SpecializationButton from './components/SpecializationButton';

const RogueSkillsMechanics: React.FC = () => {
  const { buildState, updateSpecialization } = useBuildContext();
  const { selectedClass, specialization: selectedSpecialization } = buildState;

  if (selectedClass !== 'Rogue') return null;

  return (
    <div className="mt-0 flex flex-col items-center">
      <SkillSelection />
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="mb-4 text-center text-xl font-bold">Specialization</h2>
        <div className="flex justify-center space-x-4">
          {specializations.map((spec) => (
            <SpecializationButton
              key={spec.name}
              specialization={spec}
              isSelected={selectedSpecialization === spec.name}
              onSelect={() => updateSpecialization(spec.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RogueSkillsMechanics;
