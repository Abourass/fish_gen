import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { Checkbox } from '@kobalte/core/checkbox';
import type { FishColor } from '../types';
import { FISH_COLORS } from '../types';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: FishColor) => void;
}

export const ColorPicker: Component<ColorPickerProps> = (props) => {
  return (
    <div class="space-y-2">
      <label class="text-sm font-medium text-gray-300">{props.label}</label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.currentTarget.value as FishColor)}
        class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <For each={FISH_COLORS}>
          {(color) => <option value={color}>{color}</option>}
        </For>
      </select>
    </div>
  );
};

interface CheckboxFieldProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxField: Component<CheckboxFieldProps> = (props) => {
  return (
    <Checkbox
      checked={props.checked}
      onChange={props.onChange}
      class="flex items-start space-x-3 group"
    >
      <Checkbox.Input class="sr-only" />
      <Checkbox.Control class="flex items-center justify-center w-5 h-5 mt-0.5 bg-slate-800 border-2 border-slate-600 rounded group-hover:border-blue-500 transition-colors">
        <Checkbox.Indicator>
          <svg class="w-3 h-3 text-blue-500" viewBox="0 0 12 12" fill="none">
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Checkbox.Indicator>
      </Checkbox.Control>
      <div class="flex-1">
        <Checkbox.Label class="text-sm font-medium text-white cursor-pointer">
          {props.label}
        </Checkbox.Label>
        {props.description && (
          <p class="text-xs text-gray-400 mt-1">{props.description}</p>
        )}
      </div>
    </Checkbox>
  );
};

interface RadioGroupProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export const RadioGroup: Component<RadioGroupProps> = (props) => {
  return (
    <div class="space-y-2">
      <label class="text-sm font-medium text-gray-300">{props.label}</label>
      <div class="space-y-2">
        <For each={props.options}>
          {(option) => (
            <label class="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name={props.label}
                value={option.value}
                checked={props.value === option.value}
                onChange={() => props.onChange(option.value)}
                class="w-4 h-4 text-blue-500 bg-slate-800 border-slate-600 focus:ring-blue-500 focus:ring-2"
              />
              <span class="text-sm text-white group-hover:text-blue-400 transition-colors">
                {option.label}
              </span>
            </label>
          )}
        </For>
      </div>
    </div>
  );
};

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export const TextInput: Component<TextInputProps> = (props) => {
  return (
    <div class="space-y-2">
      <label class="text-sm font-medium text-gray-300">{props.label}</label>
      <input
        type="text"
        value={props.value}
        onInput={(e) => props.onChange(e.currentTarget.value)}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
