import { describe, test, expect } from 'vitest';
import { LinkNode, printLinkList } from '..';
import { deleteRepeatValues } from '.';

describe('delete repeats', () => {
  test('去除链表中 只要重复的元素', () => {
    const link1 = new LinkNode(1);
    const link2 = new LinkNode(2);
    const link3 = new LinkNode(3);
    const link4 = new LinkNode(3);
    const link5 = new LinkNode(5);
    const link6 = new LinkNode(6);
    const link7 = new LinkNode(6);

    link1.next = link2;
    link2.next = link3;
    link3.next = link4;
    link4.next = link5;
    link5.next = link6;
    link6.next = link7;

    deleteRepeatValues(link1);
    expect(printLinkList(link1)).toBe('1->2->5');
  });
});
