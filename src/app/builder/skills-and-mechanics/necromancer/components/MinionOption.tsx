import React from 'react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface MinionOptionProps {
  type: string;
  name: string;
  data: any;
  selectedUpgrade: string | null;
  onSelect: (upgrade: string | null) => void;
}

const MinionOption: React.FC<MinionOptionProps> = ({ type, name, data, selectedUpgrade, onSelect }) => {
  const imagePath = `/images/skills/necromancer/bookofthedead/${type.toLowerCase().replace(' ', '_')}/${name.toLowerCase()}.png`;

  const formatDescription = (description: string, values: any) => {
    return description.replace(/\{(\w+)\}/g, (match, key) => {
      return `<span class="text-yellow-400">${values[key] || match}</span>`;
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="link"
            size="sm"
            className={`p-0 ${selectedUpgrade ? '' : ''}`}
            onClick={() => onSelect(null)}
          >
            <img src={imagePath} alt={name} className="h-11 w-11" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <h4 className="mb-2 font-semibold">{name}</h4>
          <p dangerouslySetInnerHTML={{ __html: formatDescription(data.description, data) }} />
        </HoverCardContent>
      </HoverCard>

      {['Upgrade #1', 'Upgrade #2', 'Sacrifice'].map((upgrade) => (
        <HoverCard key={upgrade}>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`p-1 ${selectedUpgrade === upgrade ? '' : ''}`}
              onClick={() => onSelect(upgrade)}
            >
              <img
                src={`/images/skills/necromancer/bookofthedead/ui/${upgrade === 'Sacrifice' ? 'sacrifice' : 'radio'}${
                  selectedUpgrade === upgrade ? '_selected' : ''
                }.png`}
                alt={upgrade}
                className="h-11 w-11"
              />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <h4 className="mb-2 font-semibold">{upgrade}</h4>
            <p dangerouslySetInnerHTML={{ __html: formatDescription(data[upgrade].description, data[upgrade]) }} />
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default MinionOption;
