import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SkillData } from '@/contexts/BuildContext';
import { getSkillImagePath } from '@/app/builder/utils/imagePathUtils';
import EnchantmentHoverCard from './EnchantmentHoverCard';
import skillsData from '@/app/data/skills.json';

interface EnchantmentSelectionDialogProps {
  onSelectEnchantment: (skill: SkillData | null) => void;
  selectedEnchantment: SkillData | null;
  index: number;
}

const EnchantmentSelectionDialog: React.FC<EnchantmentSelectionDialogProps> = ({
  onSelectEnchantment,
  selectedEnchantment,
  index,
}) => {
  const sorcererSkills = skillsData.skills?.filter((skill) => skill.class === 'Sorcerer') || [];
  const filteredSkills = sorcererSkills.filter(
    (skill) => skill.tags && Array.isArray(skill.tags) && !skill.tags.includes('Ultimate') && skill.enchantment
  );

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Select Enchantment {index + 1}</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-4 gap-4">
        {filteredSkills.map((skill) => (
          <EnchantmentHoverCard key={skill.name} skill={{ ...skill, description: [] }}>
            <Button
              variant="outline"
              className={`h-16 w-16 p-0 ${selectedEnchantment?.name === skill.name ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => onSelectEnchantment({ ...skill, description: [] })}
            >
              <img src={getSkillImagePath('Sorcerer', skill.name)} alt={skill.name} className="h-14 w-14" />
            </Button>
          </EnchantmentHoverCard>
        ))}
      </div>
    </DialogContent>
  );
};

export default EnchantmentSelectionDialog;
