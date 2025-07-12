import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

// Robust matchMedia mock for Framer Motion and jsdom
global.window.matchMedia =
  global.window.matchMedia ||
  function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  };

if (typeof (global as NodeJS.Global & typeof globalThis).TextEncoder === 'undefined') {
  (global as NodeJS.Global & typeof globalThis).TextEncoder = TextEncoder;
}

if (typeof (global as NodeJS.Global & typeof globalThis).TextDecoder === 'undefined') {
  (global as NodeJS.Global & typeof globalThis).TextDecoder = TextDecoder;
}
