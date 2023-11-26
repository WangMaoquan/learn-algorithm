/*

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。



示例 1：

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：

输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。


提示：

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104

*/

/**
 * 怎么才能合并
 * a1, a2 存在交集 a1[1] <= a2[0] => [a1[0],a2[1]]
 * a2 是 a1 子集   a1[0] <= a2[0] && a1[1] >= a2[1]
 *
 */

export function merge(intervals: number[][]): number[][] {
  if (intervals.length === 1) {
    return intervals;
  }
  const r: number[][] = [];

  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= intervals[i - 1][1]) {
      intervals[i] = [
        intervals[i - 1][0],
        Math.max(intervals[i - 1][1], intervals[i][1]),
      ];
    } else {
      r.push(intervals[i - 1]);
    }
  }
  r.push(intervals.at(-1)!);

  return r;
}
