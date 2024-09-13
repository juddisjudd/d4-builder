import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ChevronsUpDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StatOption {
  value: string;
  label: string;
  name?: string;
}

interface StatComboboxProps {
  options: StatOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

const StatCombobox: React.FC<StatComboboxProps> = ({ options, value, onChange, placeholder, disabled = false }) => {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((option) => option.value === value);

  // Remove the categorization of options
  const allOptions = options;

  return (
    <Popover open={disabled ? false : open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between overflow-hidden"
          disabled={disabled}
        >
          <span className="truncate">{value ? selectedOption?.label || value : placeholder}</span>
          {!disabled && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
        </Button>
      </PopoverTrigger>
      {!disabled && (
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {allOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                    <div className="flex flex-col">
                      <span>{option.label}</span>
                      {option.name && <span className="text-xs text-yellow-600">{option.name}</span>}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default StatCombobox;
