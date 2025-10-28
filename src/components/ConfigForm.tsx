import type { Component } from 'solid-js';
import { Tabs } from '@kobalte/core/tabs';
import type { PromptConfig } from '../types';
import { CheckboxField, RadioGroup, TextInput, ColorPicker } from './FormControls';

interface ConfigFormProps {
  config: PromptConfig;
  onUpdate: (config: PromptConfig) => void;
}

export const ConfigForm: Component<ConfigFormProps> = (props) => {
  const updateConfig = <K extends keyof PromptConfig>(key: K, value: PromptConfig[K]) => {
    props.onUpdate({ ...props.config, [key]: value });
  };

  const updateColor = <K extends keyof PromptConfig['colors']>(
    key: K,
    value: PromptConfig['colors'][K]
  ) => {
    props.onUpdate({
      ...props.config,
      colors: { ...props.config.colors, [key]: value },
    });
  };

  return (
    <Tabs defaultValue="display" class="w-full">
      <Tabs.List class="flex gap-2 border-b border-slate-700 mb-6">
        <Tabs.Trigger
          value="display"
          class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors ui-selected:text-blue-400 ui-selected:border-b-2 ui-selected:border-blue-400"
        >
          Display Options
        </Tabs.Trigger>
        <Tabs.Trigger
          value="colors"
          class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors ui-selected:text-blue-400 ui-selected:border-b-2 ui-selected:border-blue-400"
        >
          Colors
        </Tabs.Trigger>
        <Tabs.Trigger
          value="style"
          class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors ui-selected:text-blue-400 ui-selected:border-b-2 ui-selected:border-blue-400"
        >
          Style
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="display" class="space-y-4">
        <CheckboxField
          label="Show Username"
          description="Display the current user's username"
          checked={props.config.showUsername}
          onChange={(checked) => updateConfig('showUsername', checked)}
        />
        <CheckboxField
          label="Show Hostname"
          description="Display the machine's hostname"
          checked={props.config.showHostname}
          onChange={(checked) => updateConfig('showHostname', checked)}
        />
        <CheckboxField
          label="Show Path"
          description="Display the current working directory"
          checked={props.config.showPath}
          onChange={(checked) => updateConfig('showPath', checked)}
        />
        <CheckboxField
          label="Show Git Branch"
          description="Display the current git branch when in a repository"
          checked={props.config.showGitBranch}
          onChange={(checked) => updateConfig('showGitBranch', checked)}
        />
        <CheckboxField
          label="Show Git Status"
          description="Change color based on git working directory status"
          checked={props.config.showGitStatus}
          onChange={(checked) => updateConfig('showGitStatus', checked)}
        />
        <CheckboxField
          label="Show Time"
          description="Display the current time"
          checked={props.config.showTime}
          onChange={(checked) => updateConfig('showTime', checked)}
        />
      </Tabs.Content>

      <Tabs.Content value="colors" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorPicker
            label="Username Color"
            value={props.config.colors.username}
            onChange={(value) => updateColor('username', value)}
          />
          <ColorPicker
            label="Hostname Color"
            value={props.config.colors.hostname}
            onChange={(value) => updateColor('hostname', value)}
          />
          <ColorPicker
            label="Path Color"
            value={props.config.colors.path}
            onChange={(value) => updateColor('path', value)}
          />
          <ColorPicker
            label="Git Branch Color"
            value={props.config.colors.gitBranch}
            onChange={(value) => updateColor('gitBranch', value)}
          />
          <ColorPicker
            label="Git Clean Color"
            value={props.config.colors.gitClean}
            onChange={(value) => updateColor('gitClean', value)}
          />
          <ColorPicker
            label="Git Dirty Color"
            value={props.config.colors.gitDirty}
            onChange={(value) => updateColor('gitDirty', value)}
          />
          <ColorPicker
            label="Time Color"
            value={props.config.colors.time}
            onChange={(value) => updateColor('time', value)}
          />
          <ColorPicker
            label="Separator Color"
            value={props.config.colors.separator}
            onChange={(value) => updateColor('separator', value)}
          />
          <ColorPicker
            label="Prompt Character Color"
            value={props.config.colors.promptChar}
            onChange={(value) => updateColor('promptChar', value)}
          />
        </div>
      </Tabs.Content>

      <Tabs.Content value="style" class="space-y-4">
        <RadioGroup
          label="Path Style"
          value={props.config.pathStyle}
          options={[
            { value: 'full', label: 'Full Path (/home/user/projects/myapp)' },
            { value: 'short', label: 'Short Path (~/projects/myapp)' },
            { value: 'relative', label: 'Relative (myapp)' },
          ]}
          onChange={(value) => updateConfig('pathStyle', value as any)}
        />
        <TextInput
          label="Separator Character"
          value={props.config.separator}
          onChange={(value) => updateConfig('separator', value)}
          placeholder="›"
          maxLength={3}
        />
        <TextInput
          label="Prompt Character"
          value={props.config.promptChar}
          onChange={(value) => updateConfig('promptChar', value)}
          placeholder="❯"
          maxLength={3}
        />
      </Tabs.Content>
    </Tabs>
  );
};
