// vitest.config.ts
/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    // Run tests in a simulated browser environment using JSDOM
    environment: 'jsdom',
    // Enable global test functions (describe, it, expect)
    globals: true,
    // Point to setup file (created in next step)
    setupFiles: './src/test/setup.ts', // Adjust path if needed
    // Include type definitions for React Testing Library matchers
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});