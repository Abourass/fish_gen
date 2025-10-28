import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import type { PromptConfig } from '../types';

interface PromptPreviewProps {
  config: PromptConfig;
}

const colorMap: Record<string, string> = {
  black: '#000000',
  red: '#ff5555',
  green: '#50fa7b',
  yellow: '#f1fa8c',
  blue: '#8be9fd',
  magenta: '#ff79c6',
  cyan: '#8be9fd',
  white: '#f8f8f2',
  brblack: '#44475a',
  brred: '#ff6e6e',
  brgreen: '#69ff94',
  bryellow: '#ffffa5',
  brblue: '#a4ffff',
  brmagenta: '#ff92df',
  brcyan: '#a4ffff',
  brwhite: '#ffffff',
};

export const PromptPreview: Component<PromptPreviewProps> = (props) => {
  const getColorStyle = (color: string) => {
    return { color: colorMap[color] || colorMap.white };
  };

  return (
    <div class="bg-slate-950 rounded-lg p-6 font-mono text-sm border border-slate-800">
      <div class="flex flex-wrap items-center gap-1">
        <Show when={props.config.showTime}>
          <span style={getColorStyle(props.config.colors.time)}>12:34:56</span>
          <span style={getColorStyle(props.config.colors.separator)}>
            {' '}{props.config.separator}{' '}
          </span>
        </Show>
        
        <Show when={props.config.showUsername}>
          <span style={getColorStyle(props.config.colors.username)}>user</span>
        </Show>
        
        <Show when={props.config.showHostname}>
          <Show when={props.config.showUsername}>
            <span style={getColorStyle(props.config.colors.separator)}>@</span>
          </Show>
          <span style={getColorStyle(props.config.colors.hostname)}>hostname</span>
        </Show>
        
        <Show when={props.config.showPath}>
          <Show when={props.config.showUsername || props.config.showHostname}>
            <span style={getColorStyle(props.config.colors.separator)}>
              {' '}{props.config.separator}{' '}
            </span>
          </Show>
          <span style={getColorStyle(props.config.colors.path)}>
            {props.config.pathStyle === 'full' ? '/home/user/projects/myapp' :
             props.config.pathStyle === 'short' ? '~/projects/myapp' :
             'myapp'}
          </span>
        </Show>
        
        <Show when={props.config.showGitBranch}>
          <span style={getColorStyle(props.config.showGitStatus ? props.config.colors.gitDirty : props.config.colors.gitClean)}>
            {' '}(main)
          </span>
        </Show>
      </div>
      
      <div class="mt-1 flex items-center">
        <span style={getColorStyle(props.config.colors.promptChar)}>
          {props.config.promptChar}
        </span>
        <span class="ml-1 text-gray-500">█</span>
      </div>
    </div>
  );
};
