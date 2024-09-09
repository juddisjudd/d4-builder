import React from 'react';
import SkillSelection from '../components/SkillSelection';
import { Separator } from '@/components/ui/separator';

const SpiritbornSkillsMechanics: React.FC = () => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="flex items-end space-x-4">
        <SkillSelection selectedClass="Spiritborn" />
        <Separator orientation="vertical" className="h-16" />
        <div>
          <h2 className="mb-2 text-xl font-bold">Spiritborn Mechanic</h2>
          {/* Placeholder for Spiritborn-specific mechanic */}
        </div>
      </div>
    </div>
  );
};

export default SpiritbornSkillsMechanics;
