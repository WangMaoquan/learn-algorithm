import { describe, it, expect } from 'vitest';
import { lengthOfLastWord } from '../first';
import { longestCommonPrefix } from '../second';
import { strStr } from '../third';

describe('2023-11-05', () => {
  it('first', () => {
    const r = lengthOfLastWord('Hello World');
    expect(r).toBe(5);

    const r1 = lengthOfLastWord('   fly me   to   the moon  ');
    expect(r1).toBe(4);
  });

  it('second', () => {
    const r = longestCommonPrefix(['flower', 'flow', 'flight']);
    expect(r).toBe('fl');

    const r1 = longestCommonPrefix(['flower']);
    expect(r1).toBe('flower');
  });

  it('third', () => {
    const r = strStr('sadbutsad', 'sad');
    expect(r).toBe(0);

    const r1 = strStr('leetcode', 'leeto');
    expect(r1).toBe(-1);
  });
});
