import { describe, test, expect } from 'vitest';
import { hammingWeight, hammingWeightUseBitOp } from '.';

describe('位1的个数', () => {
  test('hammingWeight', () => {
    expect(hammingWeight(1)).toBe(1);
    expect(hammingWeight(2)).toBe(1);
    expect(hammingWeight(3)).toBe(2);
  });
  test('hammingWeightUseBitOp', () => {
    expect(hammingWeightUseBitOp(1)).toBe(1);
    expect(hammingWeightUseBitOp(2)).toBe(1);
    expect(hammingWeightUseBitOp(3)).toBe(2);
  });
});
