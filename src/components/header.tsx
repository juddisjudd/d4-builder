'use client';

import { FC } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
  selectedClass: string | null;
  setSelectedClass: (selectedClass: string | null) => void;
}

const classOptions = ['Barbarian', 'Druid', 'Necromancer', 'Rogue', 'Sorcerer', 'Spiritborn'];
const placeholderImage = '/images/classes/placeholder.png';

const Header: FC<HeaderProps> = ({ selectedClass, setSelectedClass }) => {
  return (
    <header className="flex flex-col bg-black p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={selectedClass ? `/images/classes/${selectedClass.toLowerCase()}.png` : placeholderImage}
            alt={selectedClass || 'Placeholder'}
            className="w-15 h-15 mr-2"
            style={{ width: '60px', height: '60px' }}
          />
          <Select onValueChange={setSelectedClass}>
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
            <DropdownMenuItem>New</DropdownMenuItem>
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
