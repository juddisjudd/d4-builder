import React from 'react';
import MinionOption from './MinionOption';
import { useBuildContext } from '@/contexts/BuildContext';

interface MinionTypeProps {
  type: string;
  data: any;
}

type ValidMinionType = 'Skeletal Warriors' | 'Skeletal Mages' | 'Golems';

const MinionType: React.FC<MinionTypeProps> = ({ type, data }) => {
  const { buildState, updateBookOfTheDead } = useBuildContext();

  function isValidMinionType(type: string): type is ValidMinionType {
    return ['Skeletal Warriors', 'Skeletal Mages', 'Golems'].includes(type);
  }

  if (!isValidMinionType(type)) {
    console.error(`Invalid minion type: ${type}`);
    return null;
  }

  const selectedOption = buildState.bookOfTheDead?.[type] || null;

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
