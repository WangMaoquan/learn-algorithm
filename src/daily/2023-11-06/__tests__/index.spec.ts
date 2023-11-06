import { describe, expect, it } from 'vitest';
import { canConstruct } from '../first';
import { isIsomorphic } from '../second';
import { wordPattern } from '../third';

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
});
