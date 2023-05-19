import { describe, test, expect } from 'vitest';
import { maxSlideWindow, maxSlideWindowUseTwoEndQueue } from '.';

describe('slide window', () => {
  test('滑动窗口', () => {
    const nums = [1, 3, -1, -3, 5, 3, 6, 7];
    expect(maxSlideWindow(nums, 3)).toEqual([3, 3, 5, 5, 6, 7]);
  });

  test('使用双端队列', () => {
    const nums = [1, 3, -1, -3, 5, 3, 6, 7];
    expect(maxSlideWindowUseTwoEndQueue(nums, 3)).toEqual([3, 3, 5, 5, 6, 7]);
  });
});
