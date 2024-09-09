import React from 'react';
import { Button } from '@/components/ui/button';
import SkillSelectionDialog from './SkillSelectionDialog';
import SkillHoverCard from './SkillHoverCard';
import { getSkillImagePath } from '../../utils/imagePathUtils';

interface SkillData {
  name: string;
  class: string;
  tags?: string[];
  description: string[];
  [key: string]: any;
}

interface SkillButtonProps {
  selectedClass: string;
  onSelectSkill: (skill: SkillData | null) => void;
  selectedSkill: SkillData | null;
  index: number;
}

const SkillButton: React.FC<SkillButtonProps> = ({ selectedClass, onSelectSkill, selectedSkill, index }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const buttonContent = (
    <Button variant="outline" className="h-16 w-16 p-0" onClick={() => setIsDialogOpen(true)}>
      {selectedSkill ? (
        <img
          src={getSkillImagePath(selectedClass, selectedSkill.name)}
          alt={selectedSkill.name}
          className="h-12 w-12 object-contain"
        />
      ) : (
        <img src="/images/skills/empty.png" alt="Empty Skill" className="h-12 w-12 object-contain" />
      )}
    </Button>
  );

  return (
    <>
      {selectedSkill ? (
        <SkillHoverCard skill={selectedSkill}>
          {buttonContent}
        </SkillHoverCard>
      ) : (
        buttonContent
      )}
      <SkillSelectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedClass={selectedClass}
        onSelectSkill={onSelectSkill}
        selectedSkills={[]}
      />
    </>
  );
};

export default SkillButton;