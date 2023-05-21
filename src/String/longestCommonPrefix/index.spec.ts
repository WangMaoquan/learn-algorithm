import { describe, test, expect } from 'vitest';
import { longestCommonPrefix } from '.';

describe('longest common prefix', () => {
  test('最长相同前缀', () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');

    expect(longestCommonPrefix(['start'])).toBe('start');

    expect(longestCommonPrefix(['flower', 'flower', 'flower', 'flower'])).toBe(
      'flower',
    );
  });
});
