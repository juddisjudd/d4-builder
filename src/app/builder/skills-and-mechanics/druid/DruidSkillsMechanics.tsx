import React from 'react';
import SkillSelection from '../components/SkillSelection';
import { useBuildContext } from '@/contexts/BuildContext';
import { spiritboons } from './data/spiritboons';
import SpiritBoonButton from './components/SpiritBoonButton';

const DruidSkillsMechanics: React.FC = () => {
  const { buildState, updateSpiritBoon } = useBuildContext();
  const { selectedClass, spiritBoons } = buildState;

  if (selectedClass !== 'Druid') return null;

  const spirits = ['Deer', 'Eagle', 'Wolf', 'Snake'];

  const currentSpiritBoons = spiritBoons || { Deer: [], Eagle: [], Wolf: [], Snake: [] };

  return (
    <div className="mt-8 flex flex-col items-center">
      <SkillSelection />
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="mb-4 text-center text-xl font-bold">Spirit Boons</h2>
        <div className="flex flex-col space-y-6">
          {spirits.map((spirit) => (
            <div key={spirit} className="flex items-center">
              <div className="mr-6 flex h-[92px] w-[80px] items-center justify-center">
                <img
                  src={`/images/skills/druid/spiritboons/${spirit.toLowerCase()}_spirit${
                    currentSpiritBoons[spirit].length === 2 ? '_bond' : ''
                  }.png`}
                  alt={`${spirit} Spirit`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="grid flex-1 grid-cols-4 gap-6">
                {spiritboons
                  .filter((boon) => boon.spirit === spirit)
                  .map((boon) => (
                    <SpiritBoonButton
                      key={boon.name}
                      boon={boon}
                      isSelected={currentSpiritBoons[spirit].includes(boon.name)}
                      onSelect={() => updateSpiritBoon(spirit, boon.name)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DruidSkillsMechanics;
