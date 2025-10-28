import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { ConfigForm } from '../components/ConfigForm';
import { DEFAULT_CONFIG } from '../types';
import type { PromptConfig } from '../types';

describe('ConfigForm', () => {
  it('should render all tabs', () => {
    const onUpdate = () => {};
    render(() => <ConfigForm config={DEFAULT_CONFIG} onUpdate={onUpdate} />);
    
    expect(screen.getByText('Display Options')).toBeInTheDocument();
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByText('Style')).toBeInTheDocument();
  });

  it('should render display options checkboxes', () => {
    const onUpdate = () => {};
    render(() => <ConfigForm config={DEFAULT_CONFIG} onUpdate={onUpdate} />);
    
    expect(screen.getByText('Show Username')).toBeInTheDocument();
    expect(screen.getByText('Show Hostname')).toBeInTheDocument();
    expect(screen.getByText('Show Path')).toBeInTheDocument();
    expect(screen.getByText('Show Git Branch')).toBeInTheDocument();
    expect(screen.getByText('Show Git Status')).toBeInTheDocument();
    expect(screen.getByText('Show Time')).toBeInTheDocument();
  });

  it('should call onUpdate when checkbox is toggled', async () => {
    let updatedConfig: PromptConfig | null = null;
    const onUpdate = (config: PromptConfig) => {
      updatedConfig = config;
    };
    
    render(() => <ConfigForm config={DEFAULT_CONFIG} onUpdate={onUpdate} />);
    
    // The checkbox label is clickable and triggers the change
    const showTimeLabel = screen.getByText('Show Time');
    fireEvent.click(showTimeLabel);
    
    expect(updatedConfig).not.toBeNull();
    expect(updatedConfig!.showTime).toBe(!DEFAULT_CONFIG.showTime);
  });

  it('should switch to colors tab', () => {
    const onUpdate = () => {};
    render(() => <ConfigForm config={DEFAULT_CONFIG} onUpdate={onUpdate} />);
    
    const colorsTab = screen.getByText('Colors');
    fireEvent.click(colorsTab);
    
    // After clicking, color options should be visible
    expect(screen.getByText('Username Color')).toBeInTheDocument();
    expect(screen.getByText('Hostname Color')).toBeInTheDocument();
  });

  it('should switch to style tab', () => {
    const onUpdate = () => {};
    render(() => <ConfigForm config={DEFAULT_CONFIG} onUpdate={onUpdate} />);
    
    const styleTab = screen.getByText('Style');
    fireEvent.click(styleTab);
    
    // After clicking, style options should be visible
    expect(screen.getByText('Path Style')).toBeInTheDocument();
    expect(screen.getByText('Separator Character')).toBeInTheDocument();
    expect(screen.getByText('Prompt Character')).toBeInTheDocument();
  });

  it('should render path style radio buttons', () => {
    const onUpdate = () => {};
    render(() => <ConfigForm config={DEFAULT_CONFIG} onUpdate={onUpdate} />);
    
    const styleTab = screen.getByText('Style');
    fireEvent.click(styleTab);
    
    expect(screen.getByText(/Full Path/)).toBeInTheDocument();
    expect(screen.getByText(/Short Path/)).toBeInTheDocument();
    expect(screen.getByText(/Relative/)).toBeInTheDocument();
  });

  it('should update separator character', () => {
    let updatedConfig: PromptConfig | null = null;
    const onUpdate = (config: PromptConfig) => {
      updatedConfig = config;
    };
    
    render(() => <ConfigForm config={DEFAULT_CONFIG} onUpdate={onUpdate} />);
    
    const styleTab = screen.getByText('Style');
    fireEvent.click(styleTab);
    
    const separatorInput = screen.getByPlaceholderText('›');
    fireEvent.input(separatorInput, { target: { value: '→' } });
    
    expect(updatedConfig).not.toBeNull();
    expect(updatedConfig!.separator).toBe('→');
  });

  it('should update prompt character', () => {
    let updatedConfig: PromptConfig | null = null;
    const onUpdate = (config: PromptConfig) => {
      updatedConfig = config;
    };
    
    render(() => <ConfigForm config={DEFAULT_CONFIG} onUpdate={onUpdate} />);
    
    const styleTab = screen.getByText('Style');
    fireEvent.click(styleTab);
    
    const promptCharInput = screen.getByPlaceholderText('❯');
    fireEvent.input(promptCharInput, { target: { value: '>' } });
    
    expect(updatedConfig).not.toBeNull();
    expect(updatedConfig!.promptChar).toBe('>');
  });
});
