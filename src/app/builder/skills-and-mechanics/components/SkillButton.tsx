import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SkillButtonProps {
  skillName: string;
}

const SkillButton: React.FC<SkillButtonProps> = ({ skillName }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-16 h-16 p-0">
          {/* Placeholder for skill icon */}
          <div className="w-12 h-12 rounded-md"></div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select {skillName}</DialogTitle>
        </DialogHeader>
        {/* Placeholder for skill selection content */}
        <div>Skill selection options for {skillName} will go here.</div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillButton;