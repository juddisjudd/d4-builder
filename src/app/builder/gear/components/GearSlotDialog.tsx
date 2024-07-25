'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GearSlotDialogProps {
  label: string;
  children: React.ReactNode;
}

const GearSlotDialog: React.FC<GearSlotDialogProps> = ({ label, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex flex-col items-center p-2">
          <span>{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">{label}</h2>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GearSlotDialog;
