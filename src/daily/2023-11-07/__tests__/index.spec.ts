import { describe, expect, it } from 'vitest';
import { isHappy } from '../first';
import { containsNearbyDuplicate } from '../second';
import { isValid } from '../third';
import { addBinary } from '../fourth';

describe('2023-11-07', () => {
  it('first', () => {
    const r = isHappy(19);
    expect(r).toBe(true);

    const r1 = isHappy(2);
    expect(r1).toBe(false);
  });

  it('second', () => {
    const r = containsNearbyDuplicate([1, 2, 3, 1], 3);
    expect(r).toBe(true);

    const r1 = containsNearbyDuplicate([1, 0, 1, 1], 1);
    expect(r1).toBe(true);

    const r2 = containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2);
    expect(r2).toBe(false);
  });

  it('third', () => {
    const r = isValid('()');
    expect(r).toBe(true);

    const r1 = isValid('()[]{}');
    expect(r1).toBe(true);

    const r2 = isValid('(]');
    expect(r2).toBe(false);
  });

  it('fourth', () => {
    const r = addBinary('11', '1');
    expect(r).toBe('100');

    const r1 = addBinary('1010', '1011');
    expect(r1).toBe('10101');

    const r2 = addBinary('0', '0');
    expect(r2).toBe('0');

    // 使用 Number 去除 0  会导致 会使用科学计数法来表示
    const r3 = addBinary(
      '10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101',
      '110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011',
    );
    expect(r3).toBe(
      '110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000',
    );
  });
});
