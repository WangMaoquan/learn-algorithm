import { describe, test, expect } from 'vitest';
import { isSameTree } from '.';

describe('判断是否是相同的树', () => {
  test('is same tree', () => {
    const tree1 = {
      value: 2,
    };
    const tree2 = {
      value: 3,
    };
    expect(isSameTree(tree1, tree2)).toBe(false);
  });
});
