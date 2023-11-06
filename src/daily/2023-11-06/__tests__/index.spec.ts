import { describe, expect, it } from 'vitest';
import { canConstruct } from '../first';
import { isIsomorphic } from '../second';

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
});
