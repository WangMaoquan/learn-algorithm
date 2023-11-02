import { describe, it, expect } from 'vitest';
import { removeElement } from '../first';
import { removeDuplicates } from '../second';
import { removeDuplicates as removeDuplicatesTrird } from '../third';

describe('2023-11-02', () => {
  it('first', () => {
    const r = removeElement([3, 2, 2, 3], 3);
    expect(r).toBe(2);
  });

  it('second', () => {
    const r = removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
    expect(r).toBe(5);
  });

  it('third', () => {
    const r = removeDuplicatesTrird([1, 1, 1, 2, 2, 3]);
    expect(r).toBe(5);
  });
});
