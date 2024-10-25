// jest.setup.js
import '@testing-library/jest-dom';

// Set environment variables needed for testing
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://iznmkrlaxdgglvsrgdxw.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bm1rcmxheGRnZ2x2c3JnZHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3MzU5NDgsImV4cCI6MjA0NTMxMTk0OH0.C13lqYIhOemQKzD5xPtE00ARlN4Hp5ZhaVBsbTqVlrI';

// Import the TextEncoder and TextDecoder polyfill from 'util' (Node.js built-in module)
const { TextEncoder, TextDecoder } = require('util');

// Assign global TextEncoder and TextDecoder for compatibility with browser-based code in Node.js
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { server } from './test-utils/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared as a part of our tests
// (e.g. for testing one-time API calls).
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
