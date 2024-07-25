import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import GearSlotDialog from './GearSlotDialog';

interface GearSlotProps {
  label?: string;
  imageSrc?: string;
  isPlaceholder?: boolean;
  isRightSide?: boolean;
  selectedClass: string | null;
}

const GearSlot: React.FC<GearSlotProps> = ({ label, imageSrc, isPlaceholder = false, isRightSide = false, selectedClass }) => {
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
        <GearSlotDialog label={label || ''} slotType={label || ''} selectedClass={selectedClass} />
      )}
    </Dialog>
  );
};

export default GearSlot;