import { describe, it, expect } from 'vitest';
import { groupAnagrams } from '..';

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
});
