import { afterEach } from 'vitest';
import { cleanup } from '@solidjs/testing-library';
import '@testing-library/jest-dom/vitest';

// Extend Vitest's expect method with methods from the testing library
afterEach(() => cleanup());
