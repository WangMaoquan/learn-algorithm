import { describe, expect, it } from 'vitest';
import { canConstruct } from '../first';
import { isIsomorphic } from '../second';
import { wordPattern } from '../third';
import { isAnagram } from '../four';
import { twoSum } from '../fifth';

describe('2023-11-06', () => {
  it('first', () => {
    const r = canConstruct('a', 'b');
    expect(r).toBe(false);
    const r1 = canConstruct('aa', 'ab');
    expect(r1).toBe(false);
    const r2 = canConstruct('aa', 'aab');
    expect(r2).toBe(true);
  });

  it('second', () => {
    const r = isIsomorphic('egg', 'add');
    expect(r).toBe(true);
    const r1 = isIsomorphic('foo', 'bar');
    expect(r1).toBe(false);
    const r2 = isIsomorphic('paper', 'title');
    expect(r2).toBe(true);
  });

  it('third', () => {
    const r = wordPattern('abba', 'dog cat cat dog');
    expect(r).toBe(true);
    const r1 = wordPattern('abba', 'dog cat cat fish');
    expect(r1).toBe(false);
    const r2 = wordPattern('aaaa', 'dog cat cat dog');
    expect(r2).toBe(false);
    const r3 = wordPattern('abba', 'dog constructor constructor dog'); // 6 整个 关键字
    expect(r3).toBe(true);
    const r4 = wordPattern('aaa', 'aa aa aa aa');
    expect(r4).toBe(false);
  });

  it('fourth', () => {
    const r = isAnagram('anagram', 'nagaram');
    expect(r).toBe(true);

    const r1 = isAnagram('rat', 'cat');
    expect(r1).toBe(false);

    const r2 = isAnagram('ab', 'b');
    expect(r2).toBe(false);
  });

  it('fifth', () => {
    const r = twoSum([2, 7, 11, 15], 9);
    expect(r).toEqual([0, 1]);

    const r1 = twoSum([3, 2, 4], 6);
    expect(r1).toEqual([1, 2]);

    const r2 = twoSum([3, 3], 6);
    expect(r2).toEqual([0, 1]);
  });
});
