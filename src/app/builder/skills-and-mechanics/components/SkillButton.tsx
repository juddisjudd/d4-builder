import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SkillSelectionDialog from './SkillSelectionDialog';

interface SkillButtonProps {
  selectedClass: string;
  onSelectSkill: (skill: any) => void;
  selectedSkills: string[];
  index: number;
}

const SkillButton: React.FC<SkillButtonProps> = ({ selectedClass, onSelectSkill, selectedSkills, index }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectSkill = (skill: any) => {
    onSelectSkill(skill);
    setIsDialogOpen(false);
  };

  const selectedSkill = selectedSkills[index];

  return (
    <>
      <Button variant="outline" className="h-16 w-16 p-0" onClick={() => setIsDialogOpen(true)}>
        {selectedSkill ? (
          <img
            src={`/images/skills/${selectedClass.toLowerCase()}/${selectedSkill.toLowerCase().replace(/\s+/g, '_')}.png`}
            alt={selectedSkill}
            className="h-12 w-12 object-contain"
          />
        ) : (
          <img src="/images/skills/empty.png" alt="Empty Skill" className="h-12 w-12 object-contain" />
        )}
      </Button>
      <SkillSelectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedClass={selectedClass}
        onSelectSkill={handleSelectSkill}
        selectedSkills={selectedSkills}
      />
    </>
  );
};

export default SkillButton;
