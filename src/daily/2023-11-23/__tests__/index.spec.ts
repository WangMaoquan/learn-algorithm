import { describe, it, expect } from 'vitest';
import { lengthOfLongestSubstring } from '..';

describe('2023-11-23', () => {
  it('无重复字符的最长子串', () => {
    const r = lengthOfLongestSubstring('abcabcbb');
    expect(r).toBe(3);

    const r1 = lengthOfLongestSubstring('bbbbb');
    expect(r1).toBe(1);

    const r2 = lengthOfLongestSubstring('pwwkew');
    expect(r2).toBe(3);

    const r3 = lengthOfLongestSubstring(' ');
    expect(r3).toBe(1);
  });
});
