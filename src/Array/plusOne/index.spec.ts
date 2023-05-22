import { describe, test, expect } from 'vitest';
import { plusOne } from '.';

describe('plus one', () => {
  test('加一', () => {
    expect(plusOne([1, 2, 3])).toEqual([1, 2, 4]);
    expect(plusOne([1, 2, 9])).toEqual([1, 3, 0]);
    expect(plusOne([0])).toEqual([1]);
  });
});
