/**
 * 题目:
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效
 *
 * 有效字符串需满足：
 * 左括号必须用相同类型的右括号闭合
 * 左括号必须以正确的顺序闭合
 * 注意空字符串可被认为是有效字符串
 *
 * 示例 1:
 * 输入: "()"
 * 输出: true
 *
 * 示例 2:
 * 输入: "()[]{}"
 * 输出: true
 *
 * 示例 3:
 * 输入: "(]"
 * 输出: false
 *
 * 示例 4:
 * 输入: "([)]"
 * 输出: false
 *
 * 示例 5:
 * 输入: "{[]}"
 * 输出: true
 */

const parenthesisMap = {
  '(': ')',
  '[': ']',
  '{': '}',
} as const;

type ParenthesisMap = typeof parenthesisMap;

type ParenthesisKeys = keyof ParenthesisMap;

export const isValid = (str: string) => {
  // 空串 返回 true
  if (!str) {
    return true;
  }

  // 将匹配到的 ( { [ 入栈
  const stack: ParenthesisMap[ParenthesisKeys][] = [];

  for (let i = 0; i < str.length; i++) {
    let s = str[i];
    if (s === '(' || s === '{' || s === '[') {
      stack.push(parenthesisMap[s]);
    } else {
      // 若栈为空，或栈顶的左括号没有和当前字符匹配上，那么判为无效
      if (!stack.length || stack.pop() !== s) {
        return false;
      }
    }
  }
  return !stack.length;
};
