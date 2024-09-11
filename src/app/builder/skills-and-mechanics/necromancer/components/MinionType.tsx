import React from 'react';
import MinionOption from './MinionOption';
import { useBuildContext } from '@/contexts/BuildContext';

interface MinionTypeProps {
  type: string;
  data: any;
}

const MinionType: React.FC<MinionTypeProps> = ({ type, data }) => {
  const { buildState, updateBookOfTheDead } = useBuildContext();
  const selectedOption = buildState.bookOfTheDead[type];

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">{type}</h3>
      <div className="space-y-6">
        {Object.entries(data).map(([optionName, optionData]) => (
          <MinionOption
            key={optionName}
            type={type}
            name={optionName}
            data={optionData}
            selectedUpgrade={selectedOption?.name === optionName ? selectedOption.upgrade : null}
            onSelect={(upgrade) => updateBookOfTheDead(type, optionName, upgrade)}
          />
        ))}
      </div>
    </div>
  );
};

export default MinionType;
