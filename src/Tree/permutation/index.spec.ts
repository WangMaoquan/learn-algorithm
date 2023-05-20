import { describe, test, expect } from 'vitest';
import { permutation } from '.';

describe('premutation', () => {
  test('返回输入数组里面每一项的全排列', () => {
    expect(permutation([1, 2, 3])).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ]);
  });
});
