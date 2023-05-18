import { describe, test, expect } from 'vitest';
import { LinkNode, printLinkList } from '..';
import { mergeLinkList } from '.';

describe('merge LinkList', () => {
  test('合并有序链表', () => {
    const link1 = new LinkNode(1);
    const link2 = new LinkNode(2);
    const link3 = new LinkNode(3);
    const link7 = new LinkNode(6);

    const link4 = new LinkNode(4);
    const link5 = new LinkNode(5);
    const link6 = new LinkNode(6);

    link1.next = link2;
    link2.next = link3;
    link3.next = link7;

    link4.next = link5;
    link5.next = link6;

    const merged = mergeLinkList(link1, link4);
    expect(printLinkList(merged!)).toBe('1->2->3->4->5->6->6');
  });
});
