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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Menu } from 'lucide-react';
import { useBuildContext } from '@/contexts/BuildContext';
import { toast } from 'sonner';

const classOptions = ['Barbarian', 'Druid', 'Necromancer', 'Rogue', 'Sorcerer', 'Spiritborn'] as const;
const placeholderImage = '/images/classes/placeholder.png';

const Header: FC = () => {
  const { buildState, setSelectedClass, resetBuild, saveBuild, loadBuild } = useBuildContext();
  const [selectKey, setSelectKey] = useState(0);
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false);
  const [isImportDialogOpen, setImportDialogOpen] = useState(false);
  const [importCode, setImportCode] = useState('');

  const handleReset = () => {
    resetBuild();
    setSelectKey((prev) => prev + 1);
  };

  type ClassOption = (typeof classOptions)[number];

  const handleClassChange = (newClass: ClassOption) => {
    if (newClass !== buildState.selectedClass) {
      resetBuild();
      setSelectedClass(newClass);
    }
  };

  const handleSave = () => {
    const encodedBuild = saveBuild();
    setSaveDialogOpen(true);
    navigator.clipboard.writeText(encodedBuild).then(() => {
      toast.success('Build code copied to clipboard');
    });
  };

  const handleImport = () => {
    setImportDialogOpen(true);
  };

  const handleImportConfirm = () => {
    try {
      loadBuild(importCode);
      setImportDialogOpen(false);
      setImportCode('');
      toast.success('Build imported successfully');
    } catch (error) {
      toast.error('Failed to import build. Please check the code and try again.');
    }
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
          <Select
            key={selectKey}
            onValueChange={(value: ClassOption) => handleClassChange(value)}
            value={buildState.selectedClass || undefined}
          >
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
            <DropdownMenuItem onClick={handleSave}>Save</DropdownMenuItem>
            <DropdownMenuItem onClick={handleImport}>Import</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isSaveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Build</DialogTitle>
            <DialogDescription>
              Your build code has been copied to the clipboard. You can share this code with others to import your
              build.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="build-code" className="text-right">
                Build Code
              </Label>
              <Input id="build-code" value={saveBuild()} readOnly className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setSaveDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isImportDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Build</DialogTitle>
            <DialogDescription>Paste the build code below to import a build.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="import-code" className="text-right">
                Build Code
              </Label>
              <Input
                id="import-code"
                value={importCode}
                onChange={(e) => setImportCode(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleImportConfirm}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
