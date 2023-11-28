import { describe, it, expect } from 'vitest';
import { reverseBits } from '..';

describe('2023-11-28', () => {
  it('颠倒二进制位', () => {
    // 43261596
    const r = reverseBits(0b00000010100101000001111010011100);
    expect(r).toBe(964176192);

    // 4294967293
    const r1 = reverseBits(0b11111111111111111111111111111101);
    expect(r1).toBe(3221225471);
  });
});
