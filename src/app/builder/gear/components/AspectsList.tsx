'use client';

import * as React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { codex, AspectData } from '../../../data/codex';
import { uniques, UniqueData } from '../../../data/uniques';
import { getAllowedAspectTypes, getWeaponTypes, getJewelryTypes } from '../utils/aspectUtils';
import { getUniqueImagePath, getAspectImagePath } from '../../utils/imagePathUtils';
import AspectHoverCard from './AspectHoverCard';
import UniqueHoverCard from './UniqueHoverCard';

interface AspectsListProps {
  slotType: string;
  selectedClass: string | null;
  onSelect: (item: AspectData | UniqueData, isUnique: boolean) => void;
  selections: (AspectData | UniqueData | null)[];
  currentIndex: number;
}

const AspectsList: React.FC<AspectsListProps> = ({ 
  slotType, 
  selectedClass, 
  onSelect, 
  selections, 
  currentIndex 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const allowedAspectTypes = getAllowedAspectTypes(slotType);
  const allowedWeaponTypes = selectedClass ? getWeaponTypes(slotType, selectedClass) : [];
  const allowedJewelryTypes = getJewelryTypes(slotType);

  const isItemSelected = (item: AspectData | UniqueData) => 
    selections.some((selection, index) => index !== currentIndex && selection && selection.name === item.name);

  const filteredAspects = codex.filter(aspect =>
    aspect.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!aspect.class || aspect.class === selectedClass) &&
    allowedAspectTypes.includes(aspect.type) &&
    !isItemSelected(aspect)
  );

  const filteredUniques = uniques.filter(unique =>
    unique.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (allowedWeaponTypes.includes(unique.type) || 
     allowedJewelryTypes.includes(unique.type) ||
     unique.type.toLowerCase() === slotType.toLowerCase()) &&
    (!unique.class || unique.class === selectedClass) &&
    !isItemSelected(unique)
  );

  const getAspectImageSrc = (aspect: AspectData) => {
    return getAspectImagePath(aspect.name, aspect.class, aspect.type);
  };

  const getUniqueImageSrc = (name: string, type: string) => {
    return getUniqueImagePath(type, name);
  };

  const redXSvg = (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12L36 36M36 12L12 36" stroke="red" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );

  const renderItem = (item: AspectData | UniqueData, isUnique: boolean) => {
    if (isUnique) {
      return (
        <UniqueHoverCard key={item.name} unique={item as UniqueData}>
          <div 
            className="flex items-center p-2 border-b cursor-pointer hover:bg-[#141414]"
            onClick={() => onSelect(item, isUnique)}
          >
            <div className="w-12 h-12 mr-4 flex items-center justify-center">
              <img 
                src={getUniqueImageSrc(item.name, item.type)}
                alt={item.name} 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const imgElement = e.currentTarget as HTMLImageElement;
                  imgElement.style.display = 'none';
                  const nextElement = imgElement.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'block';
                  }
                }}
              />
              <div style={{display: 'none'}}>{redXSvg}</div>
            </div>
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">
                {item.type}
                {(item as UniqueData).class && ` - ${(item as UniqueData).class}`}
              </p>
            </div>
          </div>
        </UniqueHoverCard>
      );
    } else {
      return (
        <AspectHoverCard key={item.name} aspect={item as AspectData}>
          <div 
            className="flex items-center p-2 border-b cursor-pointer hover:bg-[#141414]"
            onClick={() => onSelect(item, isUnique)}
          >
            <div className="w-12 h-12 mr-4 flex items-center justify-center">
              <img 
                src={getAspectImageSrc(item as AspectData)}
                alt={item.name} 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const imgElement = e.currentTarget as HTMLImageElement;
                  imgElement.style.display = 'none';
                  const nextElement = imgElement.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'block';
                  }
                }}
              />
              <div style={{display: 'none'}}>{redXSvg}</div>
            </div>
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">
                {(item as AspectData).type}
                {(item as AspectData).class && ` - ${(item as AspectData).class}`}
              </p>
            </div>
          </div>
        </AspectHoverCard>
      );
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search aspects and uniques..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="max-h-96 overflow-y-auto">
        {filteredAspects.map(aspect => renderItem(aspect, false))}
        {filteredUniques.map(unique => renderItem(unique, true))}
      </div>
    </div>
  );
};

export default AspectsList;