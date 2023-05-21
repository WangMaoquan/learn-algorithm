/**
 * 题目给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。
 * 单词 是指仅由字母组成、不包含任何空格字符的最大子字符串
 *
 * 示例 1：
 * 输入：s = "Hello World"
 * 输出：5
 *
 * 示例2:
 * 输入：s = "   fly me   to   the moon  "
 * 输出：4
 *
 * 示例3:
 * 输入：s = "luffy is still joyboy"
 * 输出：6
 *
 * 提示：
 * 1 <= s.length <= Math.pow(10, 4)
 * s 仅有英文字母和空格 ' ' 组成
 * s 中至少存在一个单词
 */

export function lengthOfLastWord(s: string): number {
  const splits = s.trim().split(/\s+/);
  return (splits[splits.length - 1] || '').length;
}

export function lengthOfLastWordUsePointer(s: string) {
  let end = s.length - 1;

  while (s[end] === ' ') {
    end--;
  }
  let start = end;
  while (start >= 0 && s[start] !== ' ') {
    start--;
  }
  return end - start;
}
