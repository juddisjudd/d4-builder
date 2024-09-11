import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import EnchantmentHoverCard from './EnchantmentHoverCard';
import EnchantmentSelectionDialog from './EnchantmentSelectionDialog';
import { SkillData } from '@/contexts/BuildContext';
import { getSkillImagePath } from '@/app/builder/utils/imagePathUtils';

interface EnchantmentButtonProps {
  selectedEnchantment: SkillData | null;
  onSelectEnchantment: (skill: SkillData | null) => void;
  index: number;
}

const EnchantmentButton: React.FC<EnchantmentButtonProps> = ({ selectedEnchantment, onSelectEnchantment, index }) => {
  return (
    <Dialog>
      <EnchantmentHoverCard skill={selectedEnchantment}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-16 w-16 p-0">
            {selectedEnchantment ? (
              <img
                src={getSkillImagePath('Sorcerer', selectedEnchantment.name)}
                alt={selectedEnchantment.name}
                className="h-14 w-14"
              />
            ) : (
              <div className="h-12 w-12 rounded-md">
                <img src="/images/skills/empty.png" alt="Empty Skill" className="h-12 w-12 object-contain" />
              </div>
            )}
          </Button>
        </DialogTrigger>
      </EnchantmentHoverCard>
      <EnchantmentSelectionDialog
        onSelectEnchantment={onSelectEnchantment}
        selectedEnchantment={selectedEnchantment}
        index={index}
      />
    </Dialog>
  );
};

export default EnchantmentButton;
