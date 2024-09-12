import React from 'react';
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { SpiritData } from '../data/spirithall';

interface SpiritButtonProps {
  spirit: string;
  data: SpiritData;
  isSelected: boolean;
  isPrimary: boolean;
  onSelect: () => void;
}

const SpiritButton: React.FC<SpiritButtonProps> = ({ spirit, data, isSelected, isPrimary, onSelect }) => {
  const imageSrc = `/images/skills/spiritborn/spirithall/${spirit.toLowerCase()}${isSelected ? '_selected' : ''}.png`;
  const passiveType = isPrimary ? "Primary Passive" : "Secondary Passive";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          size="lg"
          className={`p-0 m-2 ${isSelected ? '' : ''}`}
          onClick={onSelect}
        >
          <img src={imageSrc} alt={spirit} className="w-16 h-16" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <h3 className="font-bold mb-2">{spirit} Spirit - {passiveType}</h3>
        <p>{data[passiveType]}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default SpiritButton;