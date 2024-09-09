import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
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
      <Button
        variant="outline"
        className="w-16 h-16 p-0"
        onClick={() => setIsDialogOpen(true)}
      >
        {selectedSkill ? (
          <img
            src={`/images/skills/${selectedClass.toLowerCase()}/${selectedSkill.toLowerCase().replace(/\s+/g, '_')}.png`}
            alt={selectedSkill}
            className="w-12 h-12 object-contain"
          />
        ) : (
          <span>Skill {index + 1}</span>
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