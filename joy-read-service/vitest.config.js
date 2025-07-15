import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['__vitest__/**/*.test.js'],
    // Vitest will automatically mock modules, similar to Jest's auto-mocking.
    // We can also use vi.mock for explicit mocking.
    globals: true, // Use Vitest's globals (describe, it, expect, etc.)
    environment: 'node', // Testing in a Node.js environment
  },
})
