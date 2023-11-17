import { describe, it, expect } from 'vitest';
import { convert } from '..';

describe('2023-11-17', () => {
  it('N 字形变换', () => {
    const r = convert('PAYPALISHIRING', 3);
    expect(r).toBe('PAHNAPLSIIGYIR');

    const r1 = convert('PAYPALISHIRING', 4);
    expect(r1).toBe('PINALSIGYAHRPI');

    const r2 = convert('A', 1);
    expect(r2).toBe('A');
  });
});
