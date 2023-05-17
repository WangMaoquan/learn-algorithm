import { expect, test, describe } from 'vitest';
import { twoSumUseFor, twoSumUseMap } from '.';

describe('两数求和', () => {
  const target = 9;
  const nums = [2, 7, 11, 15];

  test('两重for循环', () => {
    expect(twoSumUseFor(nums, target)).toEqual([0, 1]);
  });

  test('map 空间换时间版本', () => {
    expect(twoSumUseMap(nums, target)).toEqual([0, 1]);
  });
});
