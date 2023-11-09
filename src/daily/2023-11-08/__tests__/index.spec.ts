import { describe, it, expect } from 'vitest';
import { ListNode, mergeTwoLists } from '../first';
import { summaryRanges } from '../second';

describe('2023-11-08', () => {
  it('first', () => {
    const list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
    const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));

    const r = mergeTwoLists(list1, list2);
    expect(r).toMatchObject({
      val: 1,
      next: {
        val: 1,
        next: {
          val: 2,
          next: {
            val: 3,
            next: {
              val: 4,
              next: {
                val: 4,
              },
            },
          },
        },
      },
    });
  });

  it('second', () => {
    const r = summaryRanges([0, 1, 2, 4, 5, 7]);
    expect(r).toEqual(['0->2', '4->5', '7']);

    const r1 = summaryRanges([0, 2, 3, 4, 6, 8, 9]);
    expect(r1).toEqual(['0', '2->4', '6', '8->9']);

    const r2 = summaryRanges([]);
    expect(r2).toEqual([]);
  });
});
