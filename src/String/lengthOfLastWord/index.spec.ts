import { describe, test, expect } from 'vitest';
import { lengthOfLastWord, lengthOfLastWordUsePointer } from '.';

describe('最后一个单词的长度', () => {
  test('lengthOfLastWord', () => {
    expect(lengthOfLastWord('Hello World')).toBe(5);
    expect(lengthOfLastWord('   fly me   to   the moon  ')).toBe(4);
    expect(lengthOfLastWord('luffy is still joyboy')).toBe(6);
  });

  test('lengthOfLastWordUsePointer', () => {
    expect(lengthOfLastWordUsePointer('Hello World')).toBe(5);
    expect(lengthOfLastWordUsePointer('   fly me   to   the moon  ')).toBe(4);
    expect(lengthOfLastWordUsePointer('luffy is still joyboy')).toBe(6);
  });
});
