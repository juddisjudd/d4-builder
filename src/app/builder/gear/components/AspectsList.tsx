'use client';

import * as React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { codex, AspectData } from '../data/codex';
import { uniques, UniqueData } from '../data/uniques';
import { getAllowedAspectTypes, getWeaponTypes, getJewelryTypes } from '../utils/aspectUtils';

interface AspectsListProps {
  slotType: string;
  selectedClass: string | null;
  onSelect: (item: AspectData | UniqueData, isUnique: boolean) => void;
}

const AspectsList: React.FC<AspectsListProps> = ({ slotType, selectedClass, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const allowedAspectTypes = getAllowedAspectTypes(slotType);
  const allowedWeaponTypes = selectedClass ? getWeaponTypes(slotType, selectedClass) : [];
  const allowedJewelryTypes = getJewelryTypes(slotType);

  const filteredAspects = codex.filter(aspect =>
    aspect.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!aspect.class || aspect.class === selectedClass) &&
    allowedAspectTypes.includes(aspect.type)
  );

  const filteredUniques = uniques.filter(unique =>
    unique.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (allowedWeaponTypes.includes(unique.type) || 
     allowedJewelryTypes.includes(unique.type) ||
     unique.type.toLowerCase() === slotType.toLowerCase()) &&
    (!unique.class || unique.class === selectedClass)
  );

  const getAspectImageSrc = (type: string) => {
    const lowerType = type.toLowerCase();
    return `/images/aspects/${lowerType}.png`;
  };

  const getUniqueImageSrc = (name: string, type: string) => {
    const lowerType = type.toLowerCase().replace(/\s+/g, '_');
    const fileName = `${name}.png`;
    const regex = /([^\\]+\.png)$/;
    const match = fileName.match(regex);
    const processedFileName = match ? match[1] : fileName;
    return `/images/uniques/${lowerType}/${encodeURIComponent(processedFileName)}`;
  };

  const redXSvg = (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12L36 36M36 12L12 36" stroke="red" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );

  const renderItem = (item: AspectData | UniqueData, isUnique: boolean) => (
    <div 
      key={item.name} 
      className="flex items-center p-2 border-b cursor-pointer hover:bg-[#141414]"
      onClick={() => onSelect(item, isUnique)}
    >
      <div className="w-12 h-12 mr-4 flex items-center justify-center">
        <img 
          src={isUnique ? getUniqueImageSrc((item as UniqueData).name, (item as UniqueData).type) : getAspectImageSrc((item as AspectData).type)}
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
          {isUnique ? (item as UniqueData).type : (item as AspectData).type}
          {item.class && ` - ${item.class}`}
        </p>
      </div>
    </div>
  );

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