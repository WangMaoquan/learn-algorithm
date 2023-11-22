import { describe, it, expect } from 'vitest';
import {
  distributeWords,
  fullJustify,
  lastRow,
  moreWordsRow,
  oneWordRow,
  twoWordsRow,
} from '..';

describe('2023-11-22', () => {
  it('distributeWords', () => {
    const r = distributeWords(
      ['This', 'is', 'an', 'example', 'of', 'text', 'justification.'],
      16,
    );
    expect(r).toEqual([
      ['This', 'is', 'an'],
      ['example', 'of', 'text'],
      ['justification.'],
    ]);

    const r1 = distributeWords(
      ['What', 'must', 'be', 'acknowledgment', 'shall', 'be'],
      16,
    );
    expect(r1).toEqual([
      ['What', 'must', 'be'],
      ['acknowledgment'],
      ['shall', 'be'],
    ]);

    const r2 = distributeWords(
      [
        'Science',
        'is',
        'what',
        'we',
        'understand',
        'well',
        'enough',
        'to',
        'explain',
        'to',
        'a',
        'computer.',
        'Art',
        'is',
        'everything',
        'else',
        'we',
        'do',
      ],
      20,
    );
    expect(r2).toEqual([
      ['Science', 'is', 'what', 'we'],
      ['understand', 'well'],
      ['enough', 'to', 'explain', 'to'],
      ['a', 'computer.', 'Art', 'is'],
      ['everything', 'else', 'we'],
      ['do'],
    ]);
  });

  it('oneWordRow', () => {
    const r = oneWordRow(['acknowledgment'], 16);
    expect(r).toBe('acknowledgment  ');
  });

  it('lastRow', () => {
    const r = lastRow(['do'], 20);
    expect(r).toBe('do                  ');

    const r1 = lastRow(['shall', 'be'], 16);
    expect(r1).toBe('shall be        ');
  });

  it('twoWordsRow', () => {
    const r = twoWordsRow(['understand', 'well'], 20);
    expect(r).toBe('understand      well');
  });

  it('moreWordsRow', () => {
    // 均分
    const r = moreWordsRow(['This', 'is', 'an'], 16);
    expect(r).toBe('This    is    an');

    const r1 = moreWordsRow(['enough', 'to', 'explain', 'to'], 20);
    expect(r1).toBe('enough to explain to');

    const r2 = moreWordsRow(['a', 'computer.', 'Art', 'is'], 20);
    expect(r2).toBe('a  computer.  Art is');
  });

  it('文本左右对齐', () => {
    const r = fullJustify(
      ['This', 'is', 'an', 'example', 'of', 'text', 'justification.'],
      16,
    );
    expect(r).toEqual([
      'This    is    an',
      'example  of text',
      'justification.  ',
    ]);

    const r1 = fullJustify(
      ['What', 'must', 'be', 'acknowledgment', 'shall', 'be'],
      16,
    );
    expect(r1).toEqual([
      'What   must   be',
      'acknowledgment  ',
      'shall be        ',
    ]);

    const r2 = fullJustify(
      [
        'Science',
        'is',
        'what',
        'we',
        'understand',
        'well',
        'enough',
        'to',
        'explain',
        'to',
        'a',
        'computer.',
        'Art',
        'is',
        'everything',
        'else',
        'we',
        'do',
      ],
      20,
    );
    expect(r2).toEqual([
      'Science  is  what we',
      'understand      well',
      'enough to explain to',
      'a  computer.  Art is',
      'everything  else  we',
      'do                  ',
    ]);
  });
});
