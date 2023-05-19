import { describe, test, expect } from 'vitest';
import { isValid } from '.';

describe('valid parenthesis', () => {
  test('检验括号', () => {
    expect(isValid('')).toBe(true);
    expect(isValid('()')).toBe(true);
    expect(isValid('(]')).toBe(false);
    expect(isValid('(')).toBe(false);
  });
});
