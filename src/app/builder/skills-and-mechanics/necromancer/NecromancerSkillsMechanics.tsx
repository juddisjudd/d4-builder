import React from 'react';
import SkillSelection from '../components/SkillSelection';
import { Separator } from '@/components/ui/separator';

const NecromancerSkillsMechanics: React.FC = () => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="flex items-end space-x-4">
        <SkillSelection selectedClass="Necromancer" />
        <Separator orientation="vertical" className="h-16" />
        <div>
          <h2 className="mb-2 text-xl font-bold">Necromancer Mechanic</h2>
          {/* Placeholder for Necromancer-specific mechanic */}
        </div>
      </div>
    </div>
  );
};

export default NecromancerSkillsMechanics;
