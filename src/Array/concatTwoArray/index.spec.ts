import { expect, test, describe } from 'vitest';
import { mergeUseDoublePointer, mergeUseSplice } from '.';

describe('合并两个有序数组', () => {
  test('双指针', () => {
    const num1 = [1, 2, 3];
    const num2 = [1, 2, 3, 3, 4];
    mergeUseDoublePointer(num1, 3, num2, 5);
    expect(num1).toEqual([1, 1, 2, 2, 3, 3, 3, 4]);
  });

  test('splice', () => {
    const num1 = [1, 2, 3];
    const num2 = [1, 2, 3, 3, 4];
    mergeUseSplice(num1, 3, num2, 5);
    expect(num1).toEqual([1, 1, 2, 2, 3, 3, 3, 4]);
  });
});
