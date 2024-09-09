import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { getSkillImagePath } from '../../utils/imagePathUtils';

interface SkillData {
  name: string;
  class: string;
  tags?: string[];
  description: string[];
  extra?: string[];
  [key: string]: any;
}

interface SkillHoverCardProps {
  skill: SkillData;
  children: React.ReactNode;
}

const SkillHoverCard: React.FC<SkillHoverCardProps> = ({ skill, children }) => {
  const renderSkillProperties = () => {
    const excludedKeys = ['name', 'class', 'tags', 'description', 'extra', 'runes', 'filters'];
    return Object.entries(skill)
      .filter(([key, value]) => !excludedKeys.includes(key) && typeof value !== 'object')
      .map(([key, value]) => (
        <p key={key} className="mb-1 text-sm">
          <span className="font-bold">{key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}:</span>
          {value && <span className="ml-1 text-yellow-400">{value}</span>}
        </p>
      ));
  };

  const renderDescription = (description: string) => {
    let renderedDescription = description;
    Object.keys(skill).forEach((key) => {
      if (key.startsWith('value') && Array.isArray(skill[key])) {
        const regex = new RegExp(`{${key}}`, 'g');
        renderedDescription = renderedDescription.replace(
          regex,
          `<span class="text-yellow-400">${skill[key][0]}</span>`
        );
      }
    });
    return <p className="mb-2 text-sm" dangerouslySetInnerHTML={{ __html: renderedDescription }} />;
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-96 border-zinc-600">
        <div className="mb-2 flex items-center space-x-2">
          <img src={getSkillImagePath(skill.class, skill.name)} alt={skill.name} className="h-10 w-10" />
          <h3 className="text-lg font-semibold">{skill.name}</h3>
        </div>
        {skill.tags && (
          <div className="mb-2 grid grid-cols-2 gap-1 text-sm">
            {skill.tags.map((tag) => (
              <span key={tag} className="rounded bg-zinc-800 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        )}
        {renderSkillProperties()}
        {renderDescription(skill.description[0])}
        {skill.extra && (
          <div className="mt-2 flex flex-wrap gap-1 text-sm">
            {skill.extra.map((extra, index) => (
              <span key={index} className="rounded bg-zinc-800 px-2 py-1">
                {extra}
              </span>
            ))}
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default SkillHoverCard;
