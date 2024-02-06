"use client";

import { Checkbox, CheckboxGroup, useCheckbox } from "@nextui-org/checkbox";
import React from "react";
import { MulitpleChoiceOption, SingleChoiceOption } from "./option";
import { RadioGroup } from "@nextui-org/radio";

interface Option {
  option: string;
  isCorrect: boolean;
  id: string;
}

interface OptionProps {
  options: Option[];
}

export default function OptionGroup({ options }: OptionProps) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const isMultipleChoice = options.filter((option) => option.isCorrect).length > 1;

  return (
    <div className="flex flex-col gap-3">
      {isMultipleChoice ? (
        <CheckboxGroup color="primary" value={selected} onValueChange={setSelected}>
          {options.map((option, i) => (
            <MulitpleChoiceOption key={i} index={i} value={option.option} />
          ))}
        </CheckboxGroup>
      ) : (
        <RadioGroup color="primary" value={selected[0]} onValueChange={(value) => setSelected([value])}>
          {options.map((option, i) => (
            <SingleChoiceOption key={i} index={i} value={option.option} />
          ))}
        </RadioGroup>
      )}
      <p className="text-default-500 text-small">
        Selected: {selected.join(", ")}
      </p>
    </div>
  );
}
