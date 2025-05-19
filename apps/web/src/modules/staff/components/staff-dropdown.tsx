import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ttrak/ui/components/popover';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@ttrak/ui/components/command';
import { Button } from '@ttrak/ui/components/button';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@ttrak/ui/lib/utils';

const options = [
  { value: 'text-to-command', label: 'Text to command' },
  { value: 'qa', label: 'Q&A' },
  { value: 'translate', label: 'English to other languages' },
  { value: 'parse', label: 'Parse unstructured data' },
  { value: 'classify', label: 'Classification' },
  { value: 'nl-to-python', label: 'Natural language to Python' },
  { value: 'explain-code', label: 'Explain code' },
  { value: 'chat', label: 'Chat' },
];

export function StaffDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof options)[0] | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='justify-between flex-3 max-w-[200px] bg-layer2 text-white border-charcoal-gray hover:bg-layer2'
        >
          {selected ? selected.label : 'Load a preset...'}
          <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[280px] p-0'>
        <Command>
          <CommandInput placeholder='Search presets...' />
          <CommandList>
            {options.map(option => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={() => {
                  setSelected(option);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selected?.value === option.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
