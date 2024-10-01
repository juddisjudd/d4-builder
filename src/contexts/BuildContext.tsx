import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AspectData } from '@/app/data/codex';
import { UniqueData } from '@/app/data/uniques';
import { GemData } from '@/app/data/gems';
import { RuneData } from '@/app/data/runes';
import { gearSlots } from '@/app/builder/gear/utils/gearSlots';
import { encodeBuildState, safeDecodeBuildState } from '@/utils/buildUtils';
import { toast } from 'sonner';
import { BuildState as ZodBuildState } from '@/utils/buildStateSchema';

type ValidMinionType = 'Skeletal Warriors' | 'Skeletal Mages' | 'Golems';

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
  'Skeletal Warriors': { name: string; upgrade: string | null } | null;
  'Skeletal Mages': { name: string; upgrade: string | null } | null;
  Golems: { name: string; upgrade: string | null } | null;
}

interface SpiritHallState {
  primary: string | null;
  secondary: string | null;
}

interface SocketItem {
  type: 'gem' | 'rune';
  item: GemData | RuneData | null;
}

export interface BuildState {
  selectedClass: string | null;
  aspects: (AspectData | UniqueData | null)[];
  sockets: SocketItem[][];
  selectedSkills: (SkillData | null)[];
  technique?: string | null;
  spiritBoons?: { [spirit: string]: string[] };
  specialization: string | null;
  enchantments: (SkillData | null)[];
  bookOfTheDead?: BookOfTheDeadState;
  spiritHall?: SpiritHallState;
  itemStats: {
    [slot: string]: (string | null)[];
  };
}

interface BuildContextType {
  buildState: ZodBuildState;
  setSelectedClass: (className: ZodBuildState['selectedClass']) => void;
  updateAspect: (index: number, item: AspectData | UniqueData | null) => void;
  updateSocket: (slotIndex: number, socketIndex: number, item: SocketItem) => void;
  updateSkill: (index: number, skill: SkillData | null) => void;
  updateTechnique: (technique: string | null) => void;
  updateSpiritBoon: (spirit: string, boonName: string) => void;
  updateSpecialization: (specialization: string | null) => void;
  updateEnchantment: (index: number, skill: SkillData | null) => void;
  updateBookOfTheDead: (type: ValidMinionType, name: string, upgrade: string | null) => void;
  updateSpiritHall: (spirit: string, isPrimary: boolean) => void;
  updateItemStat: (slot: string, index: number, value: string) => void;
  resetBuild: () => void;
  saveBuild: () => string;
  loadBuild: (encodedState: string) => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

const getInitialSockets = (className: ZodBuildState['selectedClass']): ZodBuildState['sockets'] => {
  const initialSockets: ZodBuildState['sockets'] = [];

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

  if (
    (className === 'Barbarian' || className === 'Rogue') &&
    (slotLabel === 'Dual-Wield Weapon 1' || slotLabel === 'Dual-Wield Weapon 2')
  ) {
    return 1;
  }

  return 2;
};

export const BuildProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [buildState, setBuildState] = useState<ZodBuildState>({
    selectedClass: null,
    aspects: Array(14).fill(null),
    sockets: getInitialSockets(null),
    selectedSkills: Array(6).fill(null),
    technique: null,
    spiritBoons: undefined,
    specialization: null,
    enchantments: [null, null],
    bookOfTheDead: undefined,
    spiritHall: undefined,
    itemStats: {},
  });

  const setSelectedClass = (className: ZodBuildState['selectedClass']) => {
    setBuildState((prev) => ({
      ...prev,
      selectedClass: className,
      selectedSkills: Array(6).fill(null),
      technique: null,
      spiritBoons: className ? { Deer: [], Eagle: [], Wolf: [], Snake: [] } : undefined,
      specialization: null,
      enchantments: [null, null],
      bookOfTheDead:
        className === 'Necromancer'
          ? {
              'Skeletal Warriors': null,
              'Skeletal Mages': null,
              Golems: null,
            }
          : undefined,
      spiritHall:
        className === 'Spiritborn'
          ? {
              primary: null,
              secondary: null,
            }
          : undefined,
      sockets: getInitialSockets(className),
      itemStats: {},
    }));
  };

  const updateAspect = (index: number, item: AspectData | UniqueData | null) => {
    setBuildState((prev) => {
      const newAspects = [...prev.aspects];
      newAspects[index] = item;
      return { ...prev, aspects: newAspects };
    });
  };

  const updateSocket = (slotIndex: number, socketIndex: number, item: SocketItem) => {
    setBuildState((prev) => {
      const newSockets = [...prev.sockets];
      const currentSlotSockets = [...newSockets[slotIndex]];

      if (item.type === 'rune') {
        const otherSocketIndex = socketIndex === 0 ? 1 : 0;
        const otherSocket = currentSlotSockets[otherSocketIndex];

        if (otherSocket.type === 'rune' && otherSocket.item) {
          const otherRune = otherSocket.item as RuneData;
          if (otherRune.type === (item.item as RuneData).type) {
            toast.error('You can only socket one rune of each type in a single item.');
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
      const currentSpiritBoons = prev.spiritBoons || { Deer: [], Eagle: [], Wolf: [], Snake: [] };
      const newSpiritBoons = { ...currentSpiritBoons };

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

  const updateBookOfTheDead = (type: ValidMinionType, name: string, upgrade: string | null) => {
    setBuildState((prev) => {
      const currentBookOfTheDead = prev.bookOfTheDead || {
        'Skeletal Warriors': null,
        'Skeletal Mages': null,
        Golems: null,
      };
      return {
        ...prev,
        bookOfTheDead: {
          ...currentBookOfTheDead,
          [type]: { name, upgrade },
        },
      };
    });
  };

  const updateSpiritHall = (spirit: string, isPrimary: boolean) => {
    setBuildState((prev) => ({
      ...prev,
      spiritHall: prev.spiritHall
        ? {
            ...prev.spiritHall,
            [isPrimary ? 'primary' : 'secondary']: spirit,
          }
        : {
            primary: isPrimary ? spirit : null,
            secondary: !isPrimary ? spirit : null,
          },
    }));
  };

  const updateItemStat = (slot: string, index: number, value: string) => {
    setBuildState((prev) => {
      const currentSlotStats = prev.itemStats[slot] || [];
      const newSlotStats = [...currentSlotStats];

      if (value === '') {
        newSlotStats[index] = null;
      } else {
        newSlotStats[index] = value;
      }

      while (newSlotStats.length > 0 && newSlotStats[newSlotStats.length - 1] === null) {
        newSlotStats.pop();
      }

      return {
        ...prev,
        itemStats: {
          ...prev.itemStats,
          [slot]: newSlotStats,
        },
      };
    });
  };

  const resetBuild = () => {
    setBuildState({
      selectedClass: null,
      aspects: Array(14).fill(null),
      sockets: getInitialSockets(null),
      selectedSkills: Array(6).fill(null),
      technique: null,
      spiritBoons: undefined,
      specialization: null,
      enchantments: [null, null],
      bookOfTheDead: undefined,
      spiritHall: undefined,
      itemStats: {},
    });
  };

  const saveBuild = (): string => {
    console.log('Saving build state:', buildState);
    return encodeBuildState(buildState);
  };

  const loadBuild = (encodedState: string) => {
    try {
      const { state, error } = safeDecodeBuildState(encodedState);

      if (error) {
        throw new Error(error);
      } else if (state) {
        console.log('Loading build state:', state);
        setBuildState(state);
        toast.success('Build loaded successfully');
      }
    } catch (error: unknown) {
      console.error('Failed to load build:', error);
      if (error instanceof Error) {
        toast.error(`Failed to load build: ${error.message}`);
      } else {
        toast.error('Failed to load build. An unexpected error occurred.');
      }
    }
  };

  return (
    <BuildContext.Provider
      value={{
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
        updateItemStat,
        resetBuild,
        saveBuild,
        loadBuild,
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
