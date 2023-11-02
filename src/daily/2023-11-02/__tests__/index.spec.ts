import { describe, it, expect } from 'vitest';
import { removeElement } from '../first';
import { removeDuplicates } from '../second';

describe('2023-11-02', () => {
  it('first', () => {
    const r = removeElement([3, 2, 2, 3], 3);
    expect(r).toBe(2);
  });

  it('second', () => {
    const r = removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
    expect(r).toBe(5);
  });
});
