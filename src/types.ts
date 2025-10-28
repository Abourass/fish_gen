export interface PromptConfig {
  showUsername: boolean;
  showHostname: boolean;
  showPath: boolean;
  showGitBranch: boolean;
  showGitStatus: boolean;
  showTime: boolean;
  pathStyle: 'full' | 'short' | 'relative';
  separator: string;
  promptChar: string;
  colors: {
    username: string;
    hostname: string;
    path: string;
    gitBranch: string;
    gitClean: string;
    gitDirty: string;
    time: string;
    separator: string;
    promptChar: string;
  };
}

export const DEFAULT_CONFIG: PromptConfig = {
  showUsername: true,
  showHostname: true,
  showPath: true,
  showGitBranch: true,
  showGitStatus: true,
  showTime: false,
  pathStyle: 'short',
  separator: '›',
  promptChar: '❯',
  colors: {
    username: 'cyan',
    hostname: 'green',
    path: 'blue',
    gitBranch: 'yellow',
    gitClean: 'green',
    gitDirty: 'red',
    time: 'magenta',
    separator: 'white',
    promptChar: 'cyan',
  },
};

export const FISH_COLORS = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'brblack',
  'brred',
  'brgreen',
  'bryellow',
  'brblue',
  'brmagenta',
  'brcyan',
  'brwhite',
] as const;

export type FishColor = typeof FISH_COLORS[number];
