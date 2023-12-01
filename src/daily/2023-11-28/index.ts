/*

颠倒给定的 32 位无符号整数的二进制位。

提示：

请注意，在某些语言（如 Java）中，没有无符号整数类型。在这种情况下，输入和输出都将被指定为有符号整数类型，并且不应影响您的实现，因为无论整数是有符号的还是无符号的，其内部的二进制表示形式都是相同的。
在 Java 中，编译器使用二进制补码记法来表示有符号整数。因此，在 示例 2 中，输入表示有符号整数 -3，输出表示有符号整数 -1073741825。


示例 1：

输入：n = 00000010100101000001111010011100
输出：964176192 (00111001011110000010100101000000)
解释：输入的二进制串 00000010100101000001111010011100 表示无符号整数 43261596，
因此返回 964176192，其二进制表示形式为 00111001011110000010100101000000。
示例 2：

输入：n = 11111111111111111111111111111101
输出：3221225471 (10111111111111111111111111111111)
解释：输入的二进制串 11111111111111111111111111111101 表示无符号整数 4294967293，
因此返回 3221225471 其二进制表示形式为 10111111111111111111111111111111 。


提示：

输入是一个长度为 32 的二进制字符串


进阶: 如果多次调用这个函数，你将如何优化你的算法？

*/

/*
题目的意思就是 给你一个整数, 你转换成一个 长度为32 的二进制字符串,  颠倒的就是把 reverse , 最后返还

Number.toString(2) 转换成 二进制字符 

ParseInt(targetStr, 2) 将二进制字符串 转变成 十进制

*/
export function reverseBits1(n: number): number {
  return parseInt(
    n.toString(2).padStart(32, '0').split('').reverse().join(''),
    2,
  );
}

/*

既然是二进制, 二进制怎么移位的呢?  << / >>  >>> 

<< 左移

>> 右移

>>> 无符号右移 会忽略符号位

-5 二进制表示 11111111111111111111111111111011

然后 -5 >> 2  11111111111111111111111111111110

符号位是没有变的

然而 -5 >>> 2 00111111111111111111111111111110

忽略了符号位

然后我们开始取值

我们应该先从 31 开始取

如果取的是1 怎么保证 赋值的 1 呢? 很明显 & 1

然后怎么保证 r 上原来的 1不变呢?  很明显 | 1


*/
export function reverseBits(n: number): number {
  let r = 0;
  for (let i = 0; i < 32; i++) {
    r |= (n & 1) << (31 - i);
    n >>>= 1;
  }
  // >>> 0 去掉无符号位
  return r >>> 0;
}

/*

编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。



提示：

请注意，在某些语言（如 Java）中，没有无符号整数类型。在这种情况下，输入和输出都将被指定为有符号整数类型，并且不应影响您的实现，因为无论整数是有符号的还是无符号的，其内部的二进制表示形式都是相同的。
在 Java 中，编译器使用二进制补码记法来表示有符号整数。因此，在 示例 3 中，输入表示有符号整数 -3。


示例 1：

输入：n = 00000000000000000000000000001011
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
示例 2：

输入：n = 00000000000000000000000010000000
输出：1
解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。
示例 3：

输入：n = 11111111111111111111111111111101
输出：31
解释：输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'。


提示：

输入必须是长度为 32 的 二进制串 。


进阶：

如果多次调用这个函数，你将如何优化你的算法？

*/

/*

最简单的其实就是 转成字符串判断 '1' 的数量

*/

export function hammingWeight(n: number): number {
  let r = 0;
  const bStr = n.toString(2);
  for (let i = 0; i < bStr.length; i++) {
    if (bStr[i] === '1') {
      r++;
    }
  }
  return r;
}

/*

我们知道 & 能保存 1, 其实也就是 nums1 & nums2 的结果大于 0 我们就能保证 对位存在1

那么我们怎么去构造一个 nums2 呢? 1 << i 就行了

*/

export function hammingWeight1(n: number): number {
  let r = 0;
  for (let i = 0; i < 32; i++) {
    if (n & (1 << i)) {
      r++;
    }
  }
  return r;
}

/*

给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。


示例 1 ：

输入：nums = [2,2,1]
输出：1
示例 2 ：

输入：nums = [4,1,2,1,2]
输出：4
示例 3 ：

输入：nums = [1]
输出：1

提示：

1 <= nums.length <= 3 * 104
-3 * 104 <= nums[i] <= 3 * 104
除了某个元素只出现一次以外，其余每个元素均出现两次。

*/

/*

如果不加 这个 条件: 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。

方法很多

这里要求 所以我们是用 位运算


异或 ^

1 ^ 1 = 0
0 ^ any = any

异或满足交换律和结合律

a^b^a = b^a^a = b^(a^a) = b^0=b

*/

export function singleNumber(nums: number[]): number {
  let r = 0;
  for (let i = 0; i < nums.length; i++) {
    r ^= nums[i];
  }
  return r;
}

/**

给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法且使用常数级空间来解决此问题。


示例 1：

输入：nums = [2,2,3,2]
输出：3
示例 2：

输入：nums = [0,1,0,1,0,1,99]
输出：99


提示：

1 <= nums.length <= 3 * 104
-231 <= nums[i] <= 231 - 1
nums 中，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次

*/

// 这里 可以使用额外的空间
export function singleNumberII(nums: number[]): number {
  const map = new Map<number, number>();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  let r = 0;
  for (const [k, v] of map) {
    if (v === 1) {
      r = k;
      break;
    }
  }
  return r;
}

/*

给你两个整数 left 和 right ，表示区间 [left, right] ，返回此区间内所有数字 按位与 的结果（包含 left 、right 端点）。



示例 1：

输入：left = 5, right = 7
输出：4
示例 2：

输入：left = 0, right = 0
输出：0
示例 3：

输入：left = 1, right = 2147483647
输出：0


提示：

0 <= left <= right <= 231 - 1

*/

/*

其实求的就是 left 和 right 对应位都是 1 的那个

*/

// 这种不能判断完全 因为中间的值 存在 0 所以 第三个测例没过
export function rangeBitwiseAnd1(left: number, right: number): number {
  let leftStr = left.toString(2);
  let rightStr = right.toString(2);
  let len = leftStr.length > rightStr.length ? rightStr.length : leftStr.length;
  let r = '0';

  for (let i = len; i >= 0; i--) {
    if (
      leftStr[leftStr.length - i] === '1' &&
      leftStr[leftStr.length - i] === rightStr[rightStr.length - i]
    ) {
      r = '1';
      r = r.padEnd(i, '0');
      break;
    }
  }
  return parseInt(r, 2);
}

export function rangeBitwiseAnd(left: number, right: number): number {
  let shift = 0;
  while (left < right) {
    if (left === 0) {
      break;
    }
    left >>= 1;
    right >>= 1;
    ++shift;
  }
  return left << shift;
}