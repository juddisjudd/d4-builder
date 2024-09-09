import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-gray-900 border-gray-700">
        <div className="flex items-center space-x-2 mb-2">
          <img
            src={getSkillImagePath(skill.class, skill.name)}
            alt={skill.name}
            className="w-10 h-10"
          />
          <h3 className="text-lg font-semibold">{skill.name}</h3>
        </div>
        <div className="grid grid-cols-2 gap-1 mb-2 text-sm">
          {skill.tags.map(tag => (
            <span key={tag} className="bg-gray-800 px-2 py-1 rounded">{tag}</span>
          ))}
        </div>
        {skill.fury_generate && (
          <p className="text-sm mb-1">Fury Generate: {skill.fury_generate}</p>
        )}
        {skill.lucky_hit && (
          <p className="text-sm mb-1">Lucky Hit: {skill.lucky_hit}</p>
        )}
        <p className="text-sm mb-2">{skill.description[0]}</p>
        {skill.extra && (
          <div className="text-sm mb-2">
            {skill.extra.map((extra, index) => (
              <span key={index} className="bg-gray-800 px-2 py-1 rounded mr-1">{extra}</span>
            ))}
          </div>
        )}
        {skill.runes && (
          <div className="mt-2">
            <h4 className="font-semibold mb-1">Runes:</h4>
            {skill.runes.map(rune => (
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