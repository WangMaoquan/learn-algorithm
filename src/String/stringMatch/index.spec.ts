import { describe, test, expect } from 'vitest';
import { WordDictionary } from '.';

describe('stringMatch', () => {
  test('设计一个数据结构, 支持添加和搜索字符串', () => {
    const dictionary = new WordDictionary();
    dictionary.addWord('abc');
    dictionary.addWord('abd');
    dictionary.addWord('abe');
    dictionary.addWord('abfd');
    expect(dictionary.search('abc')).toBe(true);
    expect(dictionary.search('.bc')).toBe(true);
    expect(dictionary.search('..c')).toBe(true);
    expect(dictionary.search('..cd')).toBe(false);
  });
});
