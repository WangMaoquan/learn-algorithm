/**
 * 判断一个字符串是否是回文字符串
 *
 * 什么是回文字符串?
 * 1. 正着读与反着读都是一样的字符串
 * 2. 从中间断开, 两边完全对称
 */

export const isPalindromeUseOne = (str: string) => {
  const temp = str.split('').reverse().join('');
  return temp === str;
};

export const isPalindromeUseTwo = (str: string) => {
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
};

/**
 * 题目:
 * 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串
 *
 * 示例 1:
 * 输入: "aba"
 * 输出: True
 *
 * 示例 2:
 * 输入: "abca"
 * 输出: True
 * 解释: 你可以删除c字符。
 *
 * 注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
 */

export const validatePalindrome = (str: string) => {
  const len = str.length;
  let l = 0;
  let r = len - 1;

  /**
   * 这一步可以理解为 双端指针 去除相同部分
   *
   *  1 2 3 3 4 2 1
   *
   *  经过whild 循环后
   *
   *  我们只需要判断  3 3 4
   */
  while (l < r && str[l] === str[r]) {
    l++;
    r--;
  }

  /**
   * 这后面两个判断 我们就是 判断 33 或者 34 是否是回文串 即 去除一个字符后 是否还是回文串
   */
  if (isPalindromeUseTwo(str.slice(l + 1, r + 1))) {
    return true;
  }

  if (isPalindromeUseTwo(str.slice(l, r))) {
    return true;
  }

  return false;
};
