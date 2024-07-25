'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface GearSlotProps {
  label?: string;
  imageSrc?: string;
  isPlaceholder?: boolean;
  isRightSide?: boolean;
}

const GearSlot: React.FC<GearSlotProps> = ({ label, imageSrc, isPlaceholder = false, isRightSide = false }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`flex items-center ${isRightSide ? 'flex-row-reverse' : ''}`}>
          <Button
            variant="outline"
            className={`flex items-center justify-center p-2 w-20 h-20 ${isPlaceholder ? 'bg-[#262626] border-[#52525b] cursor-not-allowed' : 'hover:bg-[#171717]'}`}
            disabled={isPlaceholder}
          >
            {imageSrc && <img src={imageSrc} alt={label} className="w-12 h-12" />}
          </Button>
          <div className={`${isRightSide ? 'mr-2 text-right' : 'ml-2'}`}>
            <div className={`text-sm ${isPlaceholder ? 'text-gray-600' : 'text-white'}`}>{label}</div>
            {!isPlaceholder && <div className="text-xs text-gray-500">Empty</div>}
          </div>
        </div>
      </DialogTrigger>
      {!isPlaceholder && (
        <DialogContent>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">{label}</h2>
            <p>Content for {label} goes here.</p>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default GearSlot;