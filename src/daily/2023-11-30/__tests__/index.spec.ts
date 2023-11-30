import { describe, it, expect } from 'vitest';
import { myPow } from '..';

describe('2023-11-30', () => {
  it('Pow(x, n)', () => {
    const r = myPow(2.0, 10);
    expect(r).toBeCloseTo(1024.0, 1);

    const r1 = myPow(2.1, 3);
    // 使用toBeCloseTo 只比较三位小数
    expect(r1).toBeCloseTo(9.261, 3);

    const r2 = myPow(2.0, -2);
    expect(r2).toBeCloseTo(0.25, 2);
  });
});
