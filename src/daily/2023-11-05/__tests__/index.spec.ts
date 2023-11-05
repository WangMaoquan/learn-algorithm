import { describe, it, expect } from 'vitest';
import { lengthOfLastWord } from '../first';

describe('2023-11-05', () => {
  it('first', () => {
    const r = lengthOfLastWord('Hello World');
    expect(r).toBe(5);

    const r1 = lengthOfLastWord('   fly me   to   the moon  ');
    expect(r1).toBe(4);
  });
});
