import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { SkillData } from '@/contexts/BuildContext';

interface EnchantmentHoverCardProps {
  skill: SkillData | null;
  children: React.ReactNode;
}

const EnchantmentHoverCard: React.FC<EnchantmentHoverCardProps> = ({ skill, children }) => {
  if (!skill) {
    return <>{children}</>;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <h3 className="mb-2 text-lg font-semibold">{skill.name}</h3>
        <p className="text-sm">{skill.enchantment}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default EnchantmentHoverCard;
