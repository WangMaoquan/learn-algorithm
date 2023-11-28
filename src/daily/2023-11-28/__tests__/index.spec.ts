import { describe, it, expect } from 'vitest';
import {
  hammingWeight,
  rangeBitwiseAnd,
  reverseBits,
  singleNumber,
  singleNumberII,
} from '..';

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

  it('只出现一次的数字', () => {
    const r = singleNumber([2, 2, 1]);
    expect(r).toBe(1);

    const r1 = singleNumber([4, 1, 2, 1, 2]);
    expect(r1).toBe(4);

    const r2 = singleNumber([1]);
    expect(r2).toBe(1);
  });

  it('只出现一次的数字 II', () => {
    const r = singleNumberII([2, 2, 3, 2]);
    expect(r).toBe(3);

    const r1 = singleNumberII([0, 1, 0, 1, 0, 1, 99]);
    expect(r1).toBe(99);
  });

  it('数字范围按位与', () => {
    const r = rangeBitwiseAnd(5, 7);
    expect(r).toBe(4);

    const r1 = rangeBitwiseAnd(0, 0);
    expect(r1).toBe(0);

    const r2 = rangeBitwiseAnd(1, 2147483647);
    expect(r2).toBe(0);
  });
});
