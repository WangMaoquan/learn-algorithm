/*

实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，xn ）。



示例 1：

输入：x = 2.00000, n = 10
输出：1024.00000
示例 2：

输入：x = 2.10000, n = 3
输出：9.26100
示例 3：

输入：x = 2.00000, n = -2
输出：0.25000
解释：2-2 = 1/22 = 1/4 = 0.25


提示：

-100.0 < x < 100.0
-231 <= n <= 231-1
n 是一个整数
要么 x 不为零，要么 n > 0 。
-104 <= xn <= 104

*/

/*

题意就是我们返回 n 个 x 相乘 的结果

但是实际上我们没有必要去循环

举个例子

x = 2, n = 4

我们只要求出 2*2 然后再求 2*2 的平方就是我们最后的结果了

所以我们可以

当 n >= 0
1. n 为 0  我们直接返回1
2. n 为 偶数, 我们先求 n / 2
3  n 为 奇数, 我们求 n * (n - 1)
当 n < 0
我们用 1 / pow(x, -n)

*/

export function myPow(x: number, n: number): number {
  if (n === 0) {
    return 1;
  }
  if (n % 2 === 1) {
    return x * myPow(x, n - 1);
  }
  if (n < 0) {
    return 1 / myPow(x, -n);
  }
  return myPow(x * x, n / 2);
}

/*

给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。求最多有多少个点在同一条直线上。


示例 1：

示例1.png

输入：points = [[1,1],[2,2],[3,3]]
输出：3
示例 2：

示例2.png



输入：points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
输出：4

提示：

1 <= points.length <= 300
points[i].length == 2
-104 <= xi, yi <= 104
points 中的所有点 互不相同

*/

/*

点共线 根据例子 我首先想到的就是 y = ax + b

根据这个思路, 也就是两个点两个点去求对应的 一次函数, 然后用后续的点去匹配这个一次函数

所以我们先求这个一次函数的 斜率 a 和 常数b

拿到之后我们遍历

*/

// 其实我们求得是 一次函数中的 a,b
export function linearFunc([x1, y1]: number[], [x2, y2]: number[]) {
  let a = 0;
  // 排除垂直于 x轴 或者 y轴
  if (y2 - y1 !== 0 && x2 - x1 !== 0) {
    a = (y2 - y1) / (x2 - x1);
  }
  const b = y2 - a * x2;
  return [a, b];
}

// 遍历 points 生成所有 两两点对应的 a,b
export function createPointsLinearFuncMap(points: number[][]) {
  const map = new Map<string, Set<number>>();
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [a, b] = linearFunc(points[i], points[j]);
      const key = a === 0 ? `${a}` : `${a},${b}`;
      if (map.has(key)) {
        // map.get(key)?.add(i);
        map.get(key)?.add(j);
      } else {
        const set = new Set([i, j]);
        map.set(key, set);
      }
    }
  }
  return map;
}

export function maxPoints(points: number[][]): number {
  let r = 1;
  const map = createPointsLinearFuncMap(points);
  for (const [k, v] of map) {
    if (v.size > r) {
      r = v.size;
    }
  }
  return r;
}
