import weaponTypesData from '@/app/data/weaponTypes.json';

export function getWeaponTypesForClass(className: string, slotType?: string): string[] {
  const classData = weaponTypesData.classes[className as keyof typeof weaponTypesData.classes];

  if (!classData) return [];

  if (typeof classData.weaponTypes === 'object' && !Array.isArray(classData.weaponTypes)) {
    if (slotType && slotType in classData.weaponTypes) {
      return classData.weaponTypes[slotType as keyof typeof classData.weaponTypes];
    }
    return Object.values(classData.weaponTypes).flat();
  }

  return classData.weaponTypes as string[];
}

export function getWeaponAttribute(weaponType: string): string {
  return weaponTypesData.weaponAttributes[weaponType as keyof typeof weaponTypesData.weaponAttributes] || '';
}
