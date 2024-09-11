import React from 'react';
import SkillSelection from '../components/SkillSelection';
import { Separator } from '@/components/ui/separator';
import { useBuildContext } from '@/contexts/BuildContext';
import EnchantmentButton from './components/EnchantmentButton';

const SorcererSkillsMechanics: React.FC = () => {
  const { buildState, updateEnchantment } = useBuildContext();
  const { selectedClass, enchantments } = buildState;

  if (selectedClass !== 'Sorcerer') return null;

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="flex items-end space-x-4">
        <SkillSelection />
        <Separator orientation="vertical" className="h-16" />
        <div>
          <h2 className="mb-2 text-xl font-bold">Enchantments</h2>
          <div className="flex space-x-2">
            {[0, 1].map((index) => (
              <EnchantmentButton
                key={index}
                selectedEnchantment={enchantments[index]}
                onSelectEnchantment={(skill) => updateEnchantment(index, skill)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SorcererSkillsMechanics;
