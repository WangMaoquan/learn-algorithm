import { describe, expect, it } from 'vitest';
import { isHappy } from '../first';

describe('2023-11-07', () => {
  it('first', () => {
    const r = isHappy(19);
    expect(r).toBe(true);

    const r1 = isHappy(2);
    expect(r1).toBe(false);
  });
});
