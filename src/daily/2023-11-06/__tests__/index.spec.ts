import { describe, expect, it } from 'vitest';
import { canConstruct } from '../first';

describe('2023-11-06', () => {
  it('first', () => {
    const r = canConstruct('a', 'b');
    expect(r).toBe(false);
    const r1 = canConstruct('aa', 'ab');
    expect(r1).toBe(false);
    const r2 = canConstruct('aa', 'aab');
    expect(r2).toBe(true);
  });
});
