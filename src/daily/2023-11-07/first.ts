/**

编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」 定义为：

对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果这个过程 结果为 1，那么这个数就是快乐数。
如果 n 是 快乐数 就返回 true ；不是，则返回 false 。



示例 1：

输入：n = 19
输出：true
解释：
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
示例 2：

输入：n = 2
输出：false


提示：

1 <= n <= 231 - 1

*/

// n 或者经过处理的结果为 1 才能返回 true
// 然后就需要解决循环的问题, 怎么判断循环? Set 集合, 再次访问 集合 存在 返回 false

export function isHappy(n: number): boolean {
  const cache = new Set(); // 存在记录说明进入循环

  while (n !== 1) {
    n = sum(n);
    if (cache.has(n)) {
      return false;
    }
    cache.add(n);
  }

  return true;
}

function sum(num: number) {
  let sum = 0;
  const s = String(num);
  for (let i = 0; i < s.length; i++) {
    sum += Number(s[i]) ** 2;
  }
  return sum;
}
