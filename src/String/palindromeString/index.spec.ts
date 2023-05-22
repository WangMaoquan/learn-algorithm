import { describe, expect, test } from 'vitest';
import { isPalindromeUseOne, isPalindromeUseTwo, validatePalindrome } from '.';

describe('判断字符串是否是回文串', () => {
  test('字符串逆序后应该与原串一样', () => {
    expect(isPalindromeUseOne('strrts')).toBe(true);
    expect(isPalindromeUseOne('strrts2')).toBe(false);
  });

  test('中间切开, 两边应该对称的', () => {
    expect(isPalindromeUseTwo('strrts')).toBe(true);
    expect(isPalindromeUseTwo('strrts2')).toBe(false);
    expect(isPalindromeUseTwo('str2rts')).toBe(true);
    expect(isPalindromeUseTwo('OP')).toBe(false);
  });

  test('给定一个字符串 在最多删除一个字符的情况下判断其 是否是回文字符串', () => {
    expect(validatePalindrome('abcbc')).toBe(false);
    expect(validatePalindrome('12321')).toBe(true);
    expect(validatePalindrome('123421')).toBe(true);
  });
});
