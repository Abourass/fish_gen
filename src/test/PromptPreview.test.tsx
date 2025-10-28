import { describe, it, expect } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import { PromptPreview } from '../components/PromptPreview';
import { DEFAULT_CONFIG } from '../types';
import type { PromptConfig } from '../types';

describe('PromptPreview', () => {
  it('should render username when showUsername is true', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showUsername: true };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  it('should not render username when showUsername is false', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showUsername: false };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.queryByText('user')).not.toBeInTheDocument();
  });

  it('should render hostname when showHostname is true', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showHostname: true };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.getByText('hostname')).toBeInTheDocument();
  });

  it('should not render hostname when showHostname is false', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showHostname: false };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.queryByText('hostname')).not.toBeInTheDocument();
  });

  it('should render time when showTime is true', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showTime: true };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.getByText('12:34:56')).toBeInTheDocument();
  });

  it('should not render time when showTime is false', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showTime: false };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.queryByText('12:34:56')).not.toBeInTheDocument();
  });

  it('should render full path when pathStyle is full', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, pathStyle: 'full', showPath: true };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.getByText('/home/user/projects/myapp')).toBeInTheDocument();
  });

  it('should render short path when pathStyle is short', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, pathStyle: 'short', showPath: true };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.getByText('~/projects/myapp')).toBeInTheDocument();
  });

  it('should render relative path when pathStyle is relative', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, pathStyle: 'relative', showPath: true };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.getByText('myapp')).toBeInTheDocument();
  });

  it('should render git branch when showGitBranch is true', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showGitBranch: true };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.getByText('(main)', { exact: false })).toBeInTheDocument();
  });

  it('should not render git branch when showGitBranch is false', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, showGitBranch: false };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.queryByText('(main)', { exact: false })).not.toBeInTheDocument();
  });

  it('should render custom separator', () => {
    const config: PromptConfig = { 
      ...DEFAULT_CONFIG, 
      separator: '→',
      showUsername: true,
      showPath: true,
    };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.getByText('→', { exact: false })).toBeInTheDocument();
  });

  it('should render custom prompt character', () => {
    const config: PromptConfig = { ...DEFAULT_CONFIG, promptChar: '>' };
    render(() => <PromptPreview config={config} />);
    
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('should render default prompt character', () => {
    render(() => <PromptPreview config={DEFAULT_CONFIG} />);
    
    expect(screen.getByText(DEFAULT_CONFIG.promptChar)).toBeInTheDocument();
  });
});
