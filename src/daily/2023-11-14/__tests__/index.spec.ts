import { describe, it, expect } from 'vitest';
import { canCompleteCircuit } from '..';

describe('2023-11-14', () => {
  it('加油站', () => {
    const r = canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]);
    expect(r).toBe(3);

    const r1 = canCompleteCircuit([2, 3, 4], [3, 4, 3]);
    expect(r1).toBe(-1);

    const r2 = canCompleteCircuit([5, 1, 2, 3, 4], [4, 4, 1, 5, 1]);
    expect(r2).toBe(4);

    const r3 = canCompleteCircuit([5, 5, 1, 3, 4], [8, 1, 7, 1, 1]);
    expect(r3).toBe(3);

    const r4 = canCompleteCircuit(
      [
        67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
        85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 1, 2,
        3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
        23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
        59, 60, 61, 62, 63, 64, 65, 66,
      ],
      [
        27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
        45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
        63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
        99, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25, 26,
      ],
    );
    expect(r4).toBe(74);

    // gas 长度为 10^4  判断那里的问题, 必须大于 0

    const r6 = canCompleteCircuit([2], [2]);
    expect(r6).toBe(0);
  });
});
