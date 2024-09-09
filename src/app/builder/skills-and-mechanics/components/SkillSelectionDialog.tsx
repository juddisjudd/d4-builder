import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import skillsData from '@/app/data/skills.json';
import { getSkillImagePath, getCategoryImagePath } from '../../utils/imagePathUtils';
import SkillHoverCard from './SkillHoverCard';

interface Skill {
  name: string;
  class: string;
  tags?: string[];
  description: string[];
  [key: string]: any;
}

interface SkillSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClass: string;
  onSelectSkill: (skill: Skill) => void;
  selectedSkills: string[];
}

const SkillSelectionDialog: React.FC<SkillSelectionDialogProps> = ({
  isOpen,
  onClose,
  selectedClass,
  onSelectSkill,
  selectedSkills,
}) => {
  const classSkills = (skillsData.skills as Skill[]).filter((skill) => skill.class === selectedClass);
  const categories = Array.from(
    new Set(
      classSkills.map((skill) => skill.tags?.[0]).filter((category): category is string => category !== undefined)
    )
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Select a Skill</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <img src={getCategoryImagePath(category)} alt={category} className="h-[50px] w-[50px] object-contain" />
              <Separator orientation="vertical" className="mx-2 h-[50px]" />
              <div className="flex flex-wrap gap-2">
                {classSkills
                  .filter((skill) => skill.tags?.[0] === category)
                  .map((skill) => (
                    <SkillHoverCard key={skill.name} skill={skill}>
                      <img
                        src={getSkillImagePath(selectedClass, skill.name)}
                        alt={skill.name}
                        className={`h-[50px] w-[50px] cursor-pointer object-contain transition-all duration-200 ${
                          selectedSkills.includes(skill.name) ? '' : 'grayscale filter hover:filter-none'
                        }`}
                        onClick={() => onSelectSkill(skill)}
                      />
                    </SkillHoverCard>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillSelectionDialog;
