import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import skillsData from '@/app/data/skills.json';
import { getSkillImagePath, getCategoryImagePath } from '../../utils/imagePathUtils';
import SkillHoverCard from './SkillHoverCard';

interface SkillSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClass: string;
  onSelectSkill: (skill: any) => void;
  selectedSkills: string[];
}

const SkillSelectionDialog: React.FC<SkillSelectionDialogProps> = ({
    isOpen,
    onClose,
    selectedClass,
    onSelectSkill,
    selectedSkills,
  }) => {
    const classSkills = skillsData.skills.filter(skill => skill.class === selectedClass);
    const categories = Array.from(new Set(classSkills.map(skill => skill.tags?.[0]).filter((category): category is string => category !== undefined)));
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Select a Skill</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <img 
                  src={getCategoryImagePath(category)}
                  alt={category}
                  className="w-[50px] h-[50px] object-contain"
                />
                <Separator orientation="vertical" className="mx-2 h-[50px]" />
                <div className="flex flex-wrap gap-2">
                  {classSkills
                    .filter(skill => skill.tags?.[0] === category)
                    .map(skill => (
                      <img 
                        key={skill.name}
                        src={getSkillImagePath(selectedClass, skill.name)}
                        alt={skill.name}
                        className={`w-[50px] h-[50px] object-contain cursor-pointer transition-all duration-200 ${selectedSkills.includes(skill.name) ? '' : 'filter grayscale hover:filter-none'}`}
                        onClick={() => onSelectSkill(skill)}
                      />
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default SkillSelectionDialog;
