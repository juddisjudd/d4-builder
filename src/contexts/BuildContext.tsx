import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AspectData } from '@/app/data/codex';
import { UniqueData } from '@/app/data/uniques';
import { GemData } from '@/app/data/gems';

export interface SkillData {
  name: string;
  class: string;
  tags?: string[];
  description: string[];
  extra?: string[];
  enchantment?: string;
  [key: string]: any;
}

interface BuildState {
  selectedClass: string | null;
  aspects: (AspectData | UniqueData | null)[];
  gems: (GemData | null)[];
  selectedSkills: (SkillData | null)[];
  technique?: string | null;
  spiritBoons: { [spirit: string]: string[] };
  specialization: string | null;
  enchantments: (SkillData | null)[];
}

interface BuildContextType {
  buildState: BuildState;
  setSelectedClass: (className: string | null) => void;
  updateAspect: (index: number, item: AspectData | UniqueData | null) => void;
  updateGem: (index: number, gem: GemData | null) => void;
  updateSkill: (index: number, skill: SkillData | null) => void;
  updateTechnique: (technique: string | null) => void;
  updateSpiritBoon: (spirit: string, boonName: string) => void;
  updateSpecialization: (specialization: string | null) => void;
  updateEnchantment: (index: number, skill: SkillData | null) => void;
  resetBuild: () => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export const BuildProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [buildState, setBuildState] = useState<BuildState>({
    selectedClass: null,
    aspects: Array(14).fill(null),
    gems: Array(5).fill(null),
    selectedSkills: Array(6).fill(null),
    technique: null,
    spiritBoons: { Deer: [], Eagle: [], Wolf: [], Snake: [] },
    specialization: null,
    enchantments: [null, null],
  });

  const setSelectedClass = (className: string | null) => {
    setBuildState((prev) => ({
      ...prev,
      selectedClass: className,
      selectedSkills: Array(6).fill(null),
      technique: null,
      spiritBoons: { Deer: [], Eagle: [], Wolf: [], Snake: [] },
      specialization: null,
      enchantments: [null, null],
    }));
  };

  const updateAspect = (index: number, item: AspectData | UniqueData | null) => {
    setBuildState((prev) => {
      const newAspects = [...prev.aspects];
      newAspects[index] = item;
      return { ...prev, aspects: newAspects };
    });
  };

  const updateGem = (index: number, gem: GemData | null) => {
    setBuildState((prev) => {
      const newGems = [...prev.gems];
      newGems[index] = gem;
      return { ...prev, gems: newGems };
    });
  };

  const updateSkill = (index: number, skill: SkillData | null) => {
    setBuildState((prev) => {
      const newSkills = [...prev.selectedSkills];
      newSkills[index] = skill;
      return { ...prev, selectedSkills: newSkills };
    });
  };

  const updateTechnique = (technique: string | null) => {
    setBuildState((prev) => ({ ...prev, technique }));
  };

  const updateSpiritBoon = (spirit: string, boonName: string) => {
    setBuildState((prev) => {
      const newSpiritBoons = { ...prev.spiritBoons };

      if (newSpiritBoons[spirit].includes(boonName)) {
        newSpiritBoons[spirit] = newSpiritBoons[spirit].filter((boon) => boon !== boonName);
      } else {
        if (
          newSpiritBoons[spirit].length < 1 ||
          (newSpiritBoons[spirit].length === 1 && Object.values(newSpiritBoons).every((boons) => boons.length <= 1))
        ) {
          newSpiritBoons[spirit] = [...newSpiritBoons[spirit], boonName].slice(0, 2);
        } else {
          newSpiritBoons[spirit] = [boonName];
        }
      }

      return { ...prev, spiritBoons: newSpiritBoons };
    });
  };

  const updateSpecialization = (specialization: string | null) => {
    setBuildState((prev) => ({ ...prev, specialization }));
  };

  const updateEnchantment = (index: number, skill: SkillData | null) => {
    setBuildState((prev) => {
      const newEnchantments = [...prev.enchantments];
      newEnchantments[index] = skill;
      return { ...prev, enchantments: newEnchantments };
    });
  };

  const resetBuild = () => {
    setBuildState({
      selectedClass: null,
      aspects: Array(14).fill(null),
      gems: Array(5).fill(null),
      selectedSkills: Array(6).fill(null),
      technique: null,
      spiritBoons: { Deer: [], Eagle: [], Wolf: [], Snake: [] },
      specialization: null,
      enchantments: [null, null],
    });
  };

  return (
    <BuildContext.Provider
      value={{
        buildState,
        setSelectedClass,
        updateAspect,
        updateGem,
        updateSkill,
        updateTechnique,
        updateSpiritBoon,
        updateSpecialization,
        updateEnchantment,
        resetBuild,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};

export const useBuildContext = () => {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error('useBuildContext must be used within a BuildProvider');
  }
  return context;
};
