import { describe, it, expect } from 'vitest';
import { reverseWords } from '..';

describe('2023-11-16', () => {
  it('反转字符串中的单词', () => {
    const r = reverseWords('the sky is blue');
    expect(r).toBe('blue is sky the');

    const r1 = reverseWords('  hello world  ');
    expect(r1).toBe('world hello');

    const r2 = reverseWords('a good   example');
    expect(r2).toBe('example good a');
  });
});
