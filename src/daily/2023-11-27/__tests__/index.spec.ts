import { describe, it, expect } from 'vitest';
import { groupAnagrams, longestConsecutive } from '..';

describe('2023-11-27', () => {
  it('字母异位词分组', () => {
    const r = groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
    // [["bat"],["nat","tan"],["ate","eat","tea"]]  无关排序
    expect(r).toEqual([['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]);

    const r1 = groupAnagrams(['']);
    expect(r1).toEqual([['']]);

    const r2 = groupAnagrams(['a']);
    expect(r2).toEqual([['a']]);
  });

  it('最长连续序列', () => {
    const r = longestConsecutive([100, 4, 200, 1, 3, 2]);
    expect(r).toEqual(4);

    const r1 = longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]);
    expect(r1).toEqual(9);
  });
});
