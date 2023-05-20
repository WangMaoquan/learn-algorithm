import { describe, test, expect } from 'vitest';
import { subset } from '.';

describe('subSet', () => {
  test('返回输入数组的所有子集', () => {
    expect(subset([1, 2, 3])).toEqual([
      [],
      [1],
      [1, 2],
      [1, 2, 3],
      [1, 3],
      [2],
      [2, 3],
      [3],
    ]);
  });
});
