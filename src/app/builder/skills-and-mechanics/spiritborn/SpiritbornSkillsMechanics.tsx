import React from 'react';
import SkillSelection from '../components/SkillSelection';
import { useBuildContext } from '@/contexts/BuildContext';
import { Separator } from '@/components/ui/separator';
import { spiritHall } from './data/spirithall';
import SpiritButton from './components/SpiritButton';

const SpiritbornSkillsMechanics: React.FC = () => {
  const { buildState, updateSpiritHall } = useBuildContext();
  const { selectedClass, spiritHall: selectedSpirits } = buildState;

  if (selectedClass !== 'Spiritborn') return null;

  const spirits = Object.keys(spiritHall);

  const handleSpiritSelect = (spirit: string, isPrimary: boolean) => {
    updateSpiritHall(spirit, isPrimary);
  };

  return (
    <div className="mt-0 flex flex-col items-center">
      <SkillSelection />
      <div className="mt-4 w-full max-w-3xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="mb-2 text-center text-lg font-semibold">Primary Spirit</h3>
            <div className="flex justify-center space-x-2">
              {spirits.map((spirit) => (
                <SpiritButton
                  key={`primary-${spirit}`}
                  spirit={spirit}
                  data={spiritHall[spirit]}
                  isSelected={selectedSpirits.primary === spirit}
                  isPrimary={true}
                  onSelect={() => handleSpiritSelect(spirit, true)}
                />
              ))}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-4 h-0" />
          <div className="flex-1">
            <h3 className="mb-2 text-center text-lg font-semibold">Secondary Spirit</h3>
            <div className="flex justify-center space-x-2">
              {spirits.map((spirit) => (
                <SpiritButton
                  key={`secondary-${spirit}`}
                  spirit={spirit}
                  data={spiritHall[spirit]}
                  isSelected={selectedSpirits.secondary === spirit}
                  isPrimary={false}
                  onSelect={() => handleSpiritSelect(spirit, false)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpiritbornSkillsMechanics;
