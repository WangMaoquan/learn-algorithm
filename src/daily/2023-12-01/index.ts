/*

给你一个 无重叠的 ，按照区间起始端点排序的区间列表。

在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。



示例 1：

输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
输出：[[1,5],[6,9]]
示例 2：

输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出：[[1,2],[3,10],[12,16]]
解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
示例 3：

输入：intervals = [], newInterval = [5,7]
输出：[[5,7]]
示例 4：

输入：intervals = [[1,5]], newInterval = [2,3]
输出：[[1,5]]
示例 5：

输入：intervals = [[1,5]], newInterval = [2,7]
输出：[[1,7]]


提示：

0 <= intervals.length <= 104
intervals[i].length == 2
0 <= intervals[i][0] <= intervals[i][1] <= 105
intervals 根据 intervals[i][0] 按 升序 排列
newInterval.length == 2
0 <= newInterval[0] <= newInterval[1] <= 105

*/

/*

1. intervals 是有序的, 所以遍历时 curr[1] < newInterval[0] 直接添加进 r 里面
2. 然后我们就需要考虑合并了, 其实就是修改 curr[1] 为 (curr[1], newInterval[1]) 中的最大值

1 3   2 4
1 3   3 4 

2 5   6 7 
*/

export function insert(
  intervals: number[][],
  newInterval: number[],
): number[][] {
  if (intervals.length === 0) {
    return [newInterval];
  }
  const r: number[][] = [];
  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i][1] < newInterval[0] || intervals[i][0] > newInterval[1]) {
      r.push(intervals[i]);
    } else {
      newInterval = [
        Math.min(intervals[i][0], newInterval[0]),
        Math.max(intervals[i][1], newInterval[1]),
      ];
      // r.length 为0 直接push
      // r.at(-1)[1] < newInterval[0] 修改
      if (r.length === 0 || r[r.length - 1][1] < newInterval[0]) {
        r.push([...newInterval]);
      } else {
        r[r.length - 1] = [...newInterval];
      }
    }
  }
  if (r[r.length - 1][1] < newInterval[0]) {
    r.push([...newInterval]);
  }
  return r;
}
