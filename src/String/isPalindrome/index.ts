/**
 * 题目:
 * 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，
 * 短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。
 * 字母和数字都属于字母数字字符。给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。
 *
 * 示例1
 * 输入: s = "A man, a plan, a canal: Panama"
 * 输出：true
 *
 * 示例2
 * 输入：s = "race a car"
 * 输出：false
 *
 * 示例3
 * 输入：s = " "
 * 输出：true
 *
 * https://leetcode.cn/problems/valid-palindrome/
 */

export function isPalindrome(s: string): boolean {
  if (!s) {
    return true;
  }
  s = (s.match(/[a-zA-Z0-9]*/g) || [])
    .filter((i) => i)
    .join('')
    .toUpperCase();
  for (let i = 0; i < s.length / 2; i++) {
    if (s[i] !== s[s.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

export function isPalindrome1(s: string): boolean {
  if (!s) {
    return true;
  }
  // 重新构造 s
  s = s.toLowerCase();
  let ns = '';
  for (let i = 0; i < s.length; i++) {
    if (/[a-z0-9]/.test(s[i])) {
      ns += s[i];
    }
  }
  for (let i = 0; i < ns.length / 2; i++) {
    if (ns[i] !== ns[ns.length - 1 - i]) {
      return false;
    }
  }
  return true;
}
