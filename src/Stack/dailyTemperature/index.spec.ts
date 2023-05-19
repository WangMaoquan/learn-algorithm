import { describe, test, expect } from 'vitest';
import { dailyTemperature } from '.';

describe('daily temperature', () => {
  test('每日温度', () => {
    const temperature = [73, 74, 75, 71, 69, 72, 76, 73];
    const result = dailyTemperature(temperature);
    expect(result).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
  });
});
