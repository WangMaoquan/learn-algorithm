import { describe, it, expect } from 'vitest';
import { hammingWeight, reverseBits } from '..';

describe('2023-11-28', () => {
  it('颠倒二进制位', () => {
    // 43261596
    const r = reverseBits(0b00000010100101000001111010011100);
    expect(r).toBe(964176192);

    // 4294967293
    const r1 = reverseBits(0b11111111111111111111111111111101);
    expect(r1).toBe(3221225471);
  });

  it('位1的个数', () => {
    const r = hammingWeight(0b00000000000000000000000000001011);
    expect(r).toBe(3);

    const r1 = hammingWeight(0b00000000000000000000000010000000);
    expect(r1).toBe(1);

    const r2 = hammingWeight(0b11111111111111111111111111111101);
    expect(r2).toBe(31);
  });
});
