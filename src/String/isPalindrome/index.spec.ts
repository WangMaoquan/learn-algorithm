import { describe, test, expect } from 'vitest';
import { isPalindrome, isPalindrome1 } from '.';

describe('去除非数字,字母后, 忽略大小写后, 是否是一个回文串', () => {
  test('isPalindrome', () => {
    expect(isPalindrome('')).toBe(true);
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    expect(isPalindrome('race a car')).toBe(false);
  });
  test('isPalindrome1', () => {
    expect(isPalindrome1('')).toBe(true);
    expect(isPalindrome1('A man, a plan, a canal: Panama')).toBe(true);
    expect(isPalindrome1('race a car')).toBe(false);
  });
});
