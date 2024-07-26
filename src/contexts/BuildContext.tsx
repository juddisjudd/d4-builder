import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AspectData } from '@/app/builder/gear/data/codex';
import { UniqueData } from '@/app/builder/gear/data/uniques';
import { GemData } from '@/app/builder/gear/data/gems';

interface BuildState {
  selectedClass: string | null;
  aspects: (AspectData | UniqueData | null)[];
  gems: (GemData | null)[];
}

interface BuildContextType {
  buildState: BuildState;
  setSelectedClass: (className: string | null) => void;
  updateAspect: (index: number, item: AspectData | UniqueData | null) => void;
  updateGem: (index: number, gem: GemData | null) => void;
  resetBuild: () => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export const BuildProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [buildState, setBuildState] = useState<BuildState>({
    selectedClass: null,
    aspects: Array(14).fill(null),
    gems: Array(5).fill(null),
  });

  const setSelectedClass = (className: string | null) => {
    setBuildState(prev => ({ ...prev, selectedClass: className }));
  };

  const updateAspect = (index: number, item: AspectData | UniqueData | null) => {
    setBuildState(prev => {
      const newAspects = [...prev.aspects];
      newAspects[index] = item;
      return { ...prev, aspects: newAspects };
    });
  };

  const updateGem = (index: number, gem: GemData | null) => {
    setBuildState(prev => {
      const newGems = [...prev.gems];
      newGems[index] = gem;
      return { ...prev, gems: newGems };
    });
  };

  const resetBuild = () => {
    setBuildState({
      selectedClass: null,
      aspects: Array(14).fill(null),
      gems: Array(5).fill(null),
    });
  };

  return (
    <BuildContext.Provider value={{ buildState, setSelectedClass, updateAspect, updateGem, resetBuild }}>
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