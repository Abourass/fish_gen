import type { PromptConfig } from './types';

export function generateFishPrompt(config: PromptConfig): string {
  const lines: string[] = [];
  
  // Add function to get git info
  lines.push('function fish_git_prompt_info');
  lines.push('    set -l git_branch (git rev-parse --abbrev-ref HEAD 2>/dev/null)');
  lines.push('    if test -n "$git_branch"');
  lines.push('        set -l git_status (git status --porcelain 2>/dev/null)');
  lines.push('        if test -z "$git_status"');
  lines.push(`            set_color ${config.colors.gitClean}`);
  lines.push('        else');
  lines.push(`            set_color ${config.colors.gitDirty}`);
  lines.push('        end');
  lines.push('        echo -n " ($git_branch)"');
  lines.push('        set_color normal');
  lines.push('    end');
  lines.push('end');
  lines.push('');
  
  // Add main prompt function
  lines.push('function fish_prompt');
  const promptParts: string[] = [];
  
  if (config.showTime) {
    lines.push(`    set_color ${config.colors.time}`);
    lines.push('    echo -n (date "+%H:%M:%S")');
    promptParts.push('time');
  }
  
  if (config.showUsername) {
    if (promptParts.length > 0) {
      lines.push(`    set_color ${config.colors.separator}`);
      lines.push(`    echo -n " ${config.separator} "`);
    }
    lines.push(`    set_color ${config.colors.username}`);
    lines.push('    echo -n $USER');
    promptParts.push('username');
  }
  
  if (config.showHostname) {
    if (promptParts.length > 0) {
      lines.push(`    set_color ${config.colors.separator}`);
      lines.push(`    echo -n "@"`);
    }
    lines.push(`    set_color ${config.colors.hostname}`);
    lines.push('    echo -n (prompt_hostname)');
    promptParts.push('hostname');
  }
  
  if (config.showPath) {
    if (promptParts.length > 0) {
      lines.push(`    set_color ${config.colors.separator}`);
      lines.push(`    echo -n " ${config.separator} "`);
    }
    lines.push(`    set_color ${config.colors.path}`);
    
    switch (config.pathStyle) {
      case 'full':
        lines.push('    echo -n (pwd)');
        break;
      case 'short':
        lines.push('    echo -n (prompt_pwd)');
        break;
      case 'relative':
        lines.push('    echo -n (basename (pwd))');
        break;
    }
    promptParts.push('path');
  }
  
  if (config.showGitBranch) {
    lines.push('    fish_git_prompt_info');
    promptParts.push('git');
  }
  
  lines.push(`    set_color ${config.colors.separator}`);
  lines.push('    echo');
  lines.push(`    set_color ${config.colors.promptChar}`);
  lines.push(`    echo -n "${config.promptChar} "`);
  lines.push('    set_color normal');
  lines.push('end');
  
  return lines.join('\n');
}

export function downloadFishConfig(config: PromptConfig, filename: string = 'fish_prompt.fish'): void {
  const content = generateFishPrompt(config);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
