import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AspectData } from '@/app/data/codex';
import { UniqueData } from '@/app/data/uniques';
import { GemData } from '@/app/data/gems';
import { RuneData } from '@/app/data/runes';
import { gearSlots } from '@/app/data/gearSlots';

export interface SkillData {
  name: string;
  class: string;
  tags?: string[];
  description: string[];
  extra?: string[];
  enchantment?: string;
  [key: string]: any;
}

interface BookOfTheDeadState {
  [key: string]: {
    name: string;
    upgrade: string | null;
  } | null;
}

interface SpiritHallState {
  primary: string | null;
  secondary: string | null;
}

interface SocketItem {
  type: 'gem' | 'rune';
  item: GemData | RuneData | null;
}

interface BuildState {
  selectedClass: string | null;
  aspects: (AspectData | UniqueData | null)[];
  sockets: SocketItem[][];
  selectedSkills: (SkillData | null)[];
  technique?: string | null;
  spiritBoons: { [spirit: string]: string[] };
  specialization: string | null;
  enchantments: (SkillData | null)[];
  bookOfTheDead: BookOfTheDeadState;
  spiritHall: SpiritHallState;
}

interface BuildContextType {
  buildState: BuildState;
  setSelectedClass: (className: string | null) => void;
  updateAspect: (index: number, item: AspectData | UniqueData | null) => void;
  updateSocket: (slotIndex: number, socketIndex: number, item: SocketItem) => void;
  updateSkill: (index: number, skill: SkillData | null) => void;
  updateTechnique: (technique: string | null) => void;
  updateSpiritBoon: (spirit: string, boonName: string) => void;
  updateSpecialization: (specialization: string | null) => void;
  updateEnchantment: (index: number, skill: SkillData | null) => void;
  updateBookOfTheDead: (type: string, name: string, upgrade: string | null) => void;
  updateSpiritHall: (spirit: string, isPrimary: boolean) => void;
  resetBuild: () => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

const getInitialSockets = (className: string | null) => {
  const initialSockets: SocketItem[][] = [];
  
  for (let i = 0; i < 14; i++) {
    const numSockets = getNumSockets(className, i);
    initialSockets.push(Array(numSockets).fill({ type: 'gem', item: null }));
  }

  return initialSockets;
};

const getNumSockets = (className: string | null, slotIndex: number): number => {
  if (!className) return 2;

  const slots = gearSlots[className.toLowerCase()];
  const slotLabel = slots[slotIndex].label;

  if (slotLabel && ['Amulet', 'Ring 1', 'Ring 2'].includes(slotLabel)) {
    return 1;
  }

  if ((className === 'Barbarian' || className === 'Rogue') && 
      (slotLabel === 'Dual-Wield Weapon 1' || slotLabel === 'Dual-Wield Weapon 2')) {
    return 1;
  }

  return 2;
};

export const BuildProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [buildState, setBuildState] = useState<BuildState>({
    selectedClass: null,
    aspects: Array(14).fill(null),
    sockets: getInitialSockets(null),
    selectedSkills: Array(6).fill(null),
    technique: null,
    spiritBoons: { Deer: [], Eagle: [], Wolf: [], Snake: [] },
    specialization: null,
    enchantments: [null, null],
    bookOfTheDead: {
      'Skeletal Warriors': null,
      'Skeletal Mages': null,
      'Golems': null,
    },
    spiritHall: {
      primary: null,
      secondary: null,
    },
  });

  const setSelectedClass = (className: string | null) => {
    setBuildState(prev => ({
      ...prev,
      selectedClass: className,
      selectedSkills: Array(6).fill(null),
      technique: null,
      spiritBoons: { Deer: [], Eagle: [], Wolf: [], Snake: [] },
      specialization: null,
      enchantments: [null, null],
      bookOfTheDead: {
        'Skeletal Warriors': null,
        'Skeletal Mages': null,
        'Golems': null,
      },
      spiritHall: {
        primary: null,
        secondary: null,
      },
      sockets: getInitialSockets(className),
    }));
  };

  const updateAspect = (index: number, item: AspectData | UniqueData | null) => {
    setBuildState(prev => {
      const newAspects = [...prev.aspects];
      newAspects[index] = item;
      return { ...prev, aspects: newAspects };
    });
  };

  const updateSocket = (slotIndex: number, socketIndex: number, item: SocketItem) => {
    setBuildState(prev => {
      const newSockets = [...prev.sockets];
      const currentSlotSockets = [...newSockets[slotIndex]];

      if (item.type === 'rune') {
        const otherSocketIndex = socketIndex === 0 ? 1 : 0;
        const otherSocket = currentSlotSockets[otherSocketIndex];

        if (otherSocket.type === 'rune' && otherSocket.item) {
          const otherRune = otherSocket.item as RuneData;
          if (otherRune.type === (item.item as RuneData).type) {
            // Can't place two runes of the same type in one slot
            return prev;
          }
        }
      }

      currentSlotSockets[socketIndex] = item;
      newSockets[slotIndex] = currentSlotSockets;

      return { ...prev, sockets: newSockets };
    });
  };

  const updateSkill = (index: number, skill: SkillData | null) => {
    setBuildState(prev => {
      const newSkills = [...prev.selectedSkills];
      newSkills[index] = skill;
      return { ...prev, selectedSkills: newSkills };
    });
  };

  const updateTechnique = (technique: string | null) => {
    setBuildState(prev => ({ ...prev, technique }));
  };

  const updateSpiritBoon = (spirit: string, boonName: string) => {
    setBuildState((prev) => {
      const newSpiritBoons = { ...prev.spiritBoons };
      
      if (newSpiritBoons[spirit].includes(boonName)) {
        newSpiritBoons[spirit] = newSpiritBoons[spirit].filter(boon => boon !== boonName);
      } else {
        if (newSpiritBoons[spirit].length < 1 || 
            (newSpiritBoons[spirit].length === 1 && Object.values(newSpiritBoons).every(boons => boons.length <= 1))) {
          newSpiritBoons[spirit] = [...newSpiritBoons[spirit], boonName].slice(0, 2);
        } else {
          newSpiritBoons[spirit] = [boonName];
        }
      }

      return { ...prev, spiritBoons: newSpiritBoons };
    });
  };

  const updateSpecialization = (specialization: string | null) => {
    setBuildState(prev => ({ ...prev, specialization }));
  };

  const updateEnchantment = (index: number, skill: SkillData | null) => {
    setBuildState((prev) => {
      const newEnchantments = [...prev.enchantments];
      newEnchantments[index] = skill;
      return { ...prev, enchantments: newEnchantments };
    });
  };

  const updateBookOfTheDead = (type: string, name: string, upgrade: string | null) => {
    setBuildState((prev) => ({
      ...prev,
      bookOfTheDead: {
        ...prev.bookOfTheDead,
        [type]: { name, upgrade },
      },
    }));
  };

  const updateSpiritHall = (spirit: string, isPrimary: boolean) => {
    setBuildState((prev) => ({
      ...prev,
      spiritHall: {
        ...prev.spiritHall,
        [isPrimary ? 'primary' : 'secondary']: spirit,
      },
    }));
  };

  const resetBuild = () => {
    setBuildState({
      selectedClass: null,
      aspects: Array(14).fill(null),
      sockets: getInitialSockets(null),
      selectedSkills: Array(6).fill(null),
      technique: null,
      spiritBoons: { Deer: [], Eagle: [], Wolf: [], Snake: [] },
      specialization: null,
      enchantments: [null, null],
      bookOfTheDead: {
        'Skeletal Warriors': null,
        'Skeletal Mages': null,
        'Golems': null,
      },
      spiritHall: {
        primary: null,
        secondary: null,
      },
    });
  };

  return (
    <BuildContext.Provider value={{
      buildState,
      setSelectedClass,
      updateAspect,
      updateSocket,
      updateSkill,
      updateTechnique,
      updateSpiritBoon,
      updateSpecialization,
      updateEnchantment,
      updateBookOfTheDead,
      updateSpiritHall,
      resetBuild
    }}>
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