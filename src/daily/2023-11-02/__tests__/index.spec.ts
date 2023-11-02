import { describe, it, expect } from 'vitest';
import { removeElement } from '../first';

describe('2023-11-02', () => {
  it('first', () => {
    const r = removeElement([3, 2, 2, 3], 3);
    expect(r).toBe(2);
  });
});
