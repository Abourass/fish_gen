import { describe, it, expect } from 'vitest';
import { generateFishPrompt } from '../utils';
import { DEFAULT_CONFIG } from '../types';
import type { PromptConfig } from '../types';

describe('generateFishPrompt', () => {
  it('should generate a basic fish prompt with default config', () => {
    const prompt = generateFishPrompt(DEFAULT_CONFIG);
    
    expect(prompt).toContain('function fish_prompt');
    expect(prompt).toContain('function fish_git_prompt_info');
    expect(prompt).toContain('set_color');
  });

  it('should include username when showUsername is true', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showUsername: true };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).toContain('$USER');
  });

  it('should not include username when showUsername is false', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showUsername: false };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).not.toContain('$USER');
  });

  it('should include hostname when showHostname is true', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showHostname: true };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).toContain('prompt_hostname');
  });

  it('should not include hostname when showHostname is false', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showHostname: false };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).not.toContain('prompt_hostname');
  });

  it('should include time when showTime is true', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showTime: true };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).toContain('date "+%H:%M:%S"');
  });

  it('should not include time when showTime is false', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showTime: false };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).not.toContain('date "+%H:%M:%S"');
  });

  it('should use full path style', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, pathStyle: 'full' };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).toContain('echo -n (pwd)');
  });

  it('should use short path style', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, pathStyle: 'short' };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).toContain('echo -n (prompt_pwd)');
  });

  it('should use relative path style', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, pathStyle: 'relative' };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).toContain('echo -n (basename (pwd))');
  });

  it('should include custom separator', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, separator: '→' };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).toContain('→');
  });

  it('should include custom prompt character', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, promptChar: '>' };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).toContain('echo -n "> "');
  });

  it('should apply custom colors', () => {
    const config: PromptConfig = {
      ...DEFAULT_CONFIG,
      colors: {
        ...DEFAULT_CONFIG.colors,
        username: 'brred',
        hostname: 'bryellow',
      },
    };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).toContain('set_color brred');
    expect(prompt).toContain('set_color bryellow');
  });

  it('should include git prompt info when showGitBranch is true', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showGitBranch: true };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).toContain('fish_git_prompt_info');
    expect(prompt).toContain('git rev-parse --abbrev-ref HEAD');
    expect(prompt).toContain('git status --porcelain');
  });

  it('should not call git prompt info when showGitBranch is false', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showGitBranch: false };
    const prompt = generateFishPrompt(config);
    
    // The function is still defined, but it should not be called in fish_prompt
    const promptFunction = prompt.split('function fish_prompt')[1];
    expect(promptFunction).not.toContain('fish_git_prompt_info');
  });

  it('should handle git status colors', () => {
    const config: PromptConfig = {
      ...DEFAULT_CONFIG,
      showGitBranch: true,
      showGitStatus: true,
      colors: {
        ...DEFAULT_CONFIG.colors,
        gitClean: 'green',
        gitDirty: 'red',
      },
    };
    const prompt = generateFishPrompt(config);
    
    expect(prompt).toContain('set_color green');
    expect(prompt).toContain('set_color red');
  });

  it('should generate valid Fish script structure', () => {
    const prompt = generateFishPrompt(DEFAULT_CONFIG);
    
    // Check for proper function definitions
    const functionMatches = prompt.match(/function \w+/g);
    expect(functionMatches).toHaveLength(2); // fish_git_prompt_info and fish_prompt
    
    // Check for proper function endings
    const endMatches = prompt.match(/end/g);
    expect(endMatches).toBeTruthy();
    expect(endMatches!.length).toBeGreaterThanOrEqual(2);
  });

  it('should handle minimal configuration', () => {
    const config: PromptConfig = {
      ...DEFAULT_CONFIG,
      showUsername: false,
      showHostname: false,
      showPath: false,
      showGitBranch: false,
      showTime: false,
    };
    const prompt = generateFishPrompt(config);
    
    // Should still have basic structure
    expect(prompt).toContain('function fish_prompt');
    expect(prompt).toContain('end');
    expect(prompt).toContain(config.promptChar);
  });
});
