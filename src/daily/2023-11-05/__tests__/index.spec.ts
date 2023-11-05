import { describe, it, expect } from 'vitest';
import { lengthOfLastWord } from '../first';
import { longestCommonPrefix } from '../second';
import { strStr } from '../third';
import { intToRoman } from '../fourth';
import { isPalindrome } from '../fifth';
import { isSubsequence } from '../sixth';

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

  it('fourth', () => {
    const r = intToRoman(3);
    expect(r).toBe('III');

    const r1 = intToRoman(58);
    expect(r1).toBe('LVIII');

    const r2 = intToRoman(1994);
    expect(r2).toBe('MCMXCIV');
  });

  it('fifth', () => {
    const r = isPalindrome('A man, a plan, a canal: Panama');
    expect(r).toBe(true);

    const r1 = isPalindrome('race a car');
    expect(r1).toBe(false);

    const r2 = isPalindrome(' ');
    expect(r2).toBe(true);

    const r3 = isPalindrome('.,');
    expect(r3).toBe(true);

    const r4 = isPalindrome('0P');
    expect(r4).toBe(false);
  });

  it('sixth', () => {
    const r = isSubsequence('abc', 'ahbgdc');
    expect(r).toBe(true);

    const r1 = isSubsequence('axc', 'ahbgdc');
    expect(r1).toBe(false);

    const r2 = isSubsequence('aaaaaa', 'bbaaaa');
    expect(r2).toBe(false);

    const r3 = isSubsequence(
      'twn',
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxtxxxxxxxxxxxxxxxxxxxxwxxxxxxxxxxxxxxxxxxxxxxxxxn',
    );
    expect(r3).toBe(true);
  });
});
