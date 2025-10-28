import { createSignal } from 'solid-js';
import { Button } from '@kobalte/core/button';
import type { PromptConfig } from './types';
import { DEFAULT_CONFIG } from './types';
import { ConfigForm } from './components/ConfigForm';
import { PromptPreview } from './components/PromptPreview';
import { downloadFishConfig, generateFishPrompt } from './utils';

function App() {
  const [config, setConfig] = createSignal<PromptConfig>(DEFAULT_CONFIG);
  const [showCode, setShowCode] = createSignal(false);

  const handleDownload = () => {
    downloadFishConfig(config());
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <div class="min-h-screen p-4 md:p-8">
      <div class="max-w-6xl mx-auto">
        {/* Header */}
        <header class="text-center mb-8">
          <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Fish Shell Prompt Generator
          </h1>
          <p class="text-gray-400 text-lg">
            Customize and download your perfect Fish shell prompt configuration
          </p>
        </header>

        {/* Main Content */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 class="text-2xl font-semibold mb-6">Configuration</h2>
            <ConfigForm config={config()} onUpdate={setConfig} />
          </div>

          {/* Preview Panel */}
          <div class="space-y-6">
            <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h2 class="text-2xl font-semibold mb-4">Preview</h2>
              <PromptPreview config={config()} />
            </div>

            {/* Code Preview */}
            <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold">Generated Code</h2>
                <Button
                  onClick={() => setShowCode(!showCode())}
                  class="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {showCode() ? 'Hide' : 'Show'} Code
                </Button>
              </div>
              {showCode() && (
                <pre class="bg-slate-950 rounded-lg p-4 text-xs overflow-x-auto border border-slate-700 text-gray-300">
                  {generateFishPrompt(config())}
                </pre>
              )}
            </div>

            {/* Actions */}
            <div class="flex gap-4">
              <Button
                onClick={handleDownload}
                class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Download Config
              </Button>
              <Button
                onClick={handleReset}
                class="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Reset
              </Button>
            </div>

            {/* Installation Instructions */}
            <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 class="text-lg font-semibold mb-3">Installation</h3>
              <ol class="list-decimal list-inside space-y-2 text-sm text-gray-300">
                <li>Download the configuration file</li>
                <li>
                  Move it to <code class="bg-slate-900 px-2 py-1 rounded">~/.config/fish/functions/fish_prompt.fish</code>
                </li>
                <li>Restart your Fish shell or run <code class="bg-slate-900 px-2 py-1 rounded">source ~/.config/fish/config.fish</code></li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer class="text-center mt-12 text-gray-500 text-sm">
          <p>
            Built with{' '}
            <a href="https://www.solidjs.com/" target="_blank" class="text-blue-400 hover:text-blue-300">
              SolidJS
            </a>
            ,{' '}
            <a href="https://kobalte.dev/" target="_blank" class="text-blue-400 hover:text-blue-300">
              Kobalte
            </a>
            , and{' '}
            <a href="https://tailwindcss.com/" target="_blank" class="text-blue-400 hover:text-blue-300">
              Tailwind CSS
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
