/**
 * 题目:
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 * 你可以假设除了整数 0 之外，这个整数不会以零开头
 *
 * https://leetcode.cn/problems/plus-one/
 *
 * 示例 1：
 * 输入：digits = [1,2,3]
 * 输出：[1,2,4]
 *
 * 示例 2:
 * 输入：digits = [4,3,2,1]
 * 输出：[4,3,2,2]
 *
 * 示例 3:
 * 输入：digits = [0]
 * 输出：[1]
 *
 * 示例 4:
 * 输入: digits = [9]
 * 输出: [1, 0]
 *
 * 提示:
 * 1 <= digits.length <= 100
 * 0 <= digits[i] <= 9
 */

export function plusOne(digits: number[]): number[] {
  let result = digits.slice();
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i] === 9) {
      result[i] = 0;
    } else {
      result[i]++;
      return result;
    }
  }
  return [1, ...result];
}
