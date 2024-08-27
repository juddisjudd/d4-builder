'use client';

import { FC, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useBuildContext } from '@/contexts/BuildContext';

const classOptions = ['Barbarian', 'Druid', 'Necromancer', 'Rogue', 'Sorcerer', 'Spiritborn'];
const placeholderImage = '/images/classes/placeholder.png';

const Header: FC = () => {
  const { buildState, setSelectedClass, resetBuild } = useBuildContext();
  const [selectKey, setSelectKey] = useState(0);

  const handleReset = () => {
    resetBuild();
    setSelectKey((prev) => prev + 1);
  };

  return (
    <header className="flex flex-col bg-black p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={
              buildState.selectedClass
                ? `/images/classes/${buildState.selectedClass.toLowerCase()}.png`
                : placeholderImage
            }
            alt={buildState.selectedClass || 'Placeholder'}
            className="w-15 h-15 mr-2"
            style={{ width: '60px', height: '60px' }}
          />
          <Select key={selectKey} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px] border-none text-lg font-semibold uppercase text-[#d1a781] outline-none">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map((classOption) => (
                <SelectItem key={classOption} value={classOption} className="text-sm uppercase">
                  {classOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleReset}>New</DropdownMenuItem>
            <DropdownMenuItem>Save</DropdownMenuItem>
            <DropdownMenuItem>Import</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
