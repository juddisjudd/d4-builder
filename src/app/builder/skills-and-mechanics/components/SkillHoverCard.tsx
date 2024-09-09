import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { getSkillImagePath } from '../../utils/imagePathUtils';

interface SkillData {
  name: string;
  class: string;
  tags: string[];
  fury_generate?: number;
  lucky_hit?: string;
  description: string[];
  extra?: string[];
  value1?: string[];
  runes?: {
    name: string;
    description: string[];
  }[];
}

interface SkillHoverCardProps {
  skill: SkillData;
  children: React.ReactNode;
}

const SkillHoverCard: React.FC<SkillHoverCardProps> = ({ skill, children }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80 border-gray-700 bg-gray-900">
        <div className="mb-2 flex items-center space-x-2">
          <img src={getSkillImagePath(skill.class, skill.name)} alt={skill.name} className="h-10 w-10" />
          <h3 className="text-lg font-semibold">{skill.name}</h3>
        </div>
        <div className="mb-2 grid grid-cols-2 gap-1 text-sm">
          {skill.tags.map((tag) => (
            <span key={tag} className="rounded bg-gray-800 px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
        {skill.fury_generate && <p className="mb-1 text-sm">Fury Generate: {skill.fury_generate}</p>}
        {skill.lucky_hit && <p className="mb-1 text-sm">Lucky Hit: {skill.lucky_hit}</p>}
        <p className="mb-2 text-sm">{skill.description[0]}</p>
        {skill.extra && (
          <div className="mb-2 text-sm">
            {skill.extra.map((extra, index) => (
              <span key={index} className="mr-1 rounded bg-gray-800 px-2 py-1">
                {extra}
              </span>
            ))}
          </div>
        )}
        {skill.runes && (
          <div className="mt-2">
            <h4 className="mb-1 font-semibold">Runes:</h4>
            {skill.runes.map((rune) => (
              <div key={rune.name} className="mb-1">
                <span className="font-medium">{rune.name}:</span> {rune.description[0]}
              </div>
            ))}
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default SkillHoverCard;
