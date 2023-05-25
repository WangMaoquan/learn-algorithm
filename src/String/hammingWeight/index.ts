/**
 * 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量)
 *
 * 示例 1：
 * 输入：n = 00000000000000000000000000001011
 * 输出：3
 * 解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
 *
 * 示例 2:
 * 输入：n = 00000000000000000000000010000000
 * 输出：1
 * 解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。
 *
 * 示例 3:
 * 输入：n = 11111111111111111111111111111101
 * 输出：31
 * 解释：输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'
 */

export function hammingWeight(n: number): number {
  let result = 0;
  for (const char of n.toString(2)) {
    if (char === '1') {
      result++;
    }
  }
  return result;
}

export function hammingWeightUseBitOp(n: number): number {
  let result = 0;
  while (n !== 0) {
    n &= n - 1; // 整数 n 和 n -1 进行 与 运算，会使最低位的 1 变为 0
    result++;
  }
  return result;
}