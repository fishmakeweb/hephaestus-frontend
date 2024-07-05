"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Position {
  top: string;
  left: string;
  width: string;
}

interface Framework {
  value: string;
  label: string;
  position: Position;
}

interface ComboboxDemoRingProps {
  setTopRing: (value: string) => void;
  setLeftRing: (value: string) => void;
  setWidthRing: (value: string) => void;
}

const frameworks: Framework[] = [
  {
    value: "1",
    label: "6 US",
    position: { top: "270px", left: "363px", width: "81px" },
  },
  {
    value: "2",
    label: "7 US",
    position: { top: "270px", left: "360px", width: "90px" },
  },
  {
    value: "3",
    label: "8 US",
    position: { top: "270px", left: "355px", width: "100px" },
  },
];

export default function ComboboxDemoRing({
  setTopRing,
  setLeftRing,
  setWidthRing,
}: ComboboxDemoRingProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select ring size..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search ring size..." />
          <CommandList>
            <CommandEmpty>No ring size found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.label}
                  value={framework.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    if (currentValue !== value) {
                      const position = frameworks.find(
                        (f) => f.label === currentValue
                      )?.position;
                      if (position) {
                        setTopRing(position.top);
                        setLeftRing(position.left);
                        setWidthRing(position.width);
                      }
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
