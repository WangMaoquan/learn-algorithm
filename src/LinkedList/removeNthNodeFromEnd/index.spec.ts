import { describe, test, expect } from 'vitest';
import { LinkNode, printLinkList } from '..';
import { removeNthFromEnd } from '.';

describe('remove nth node from end', () => {
  test('删除倒数第n个节点', () => {
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

    const r = removeNthFromEnd(link1, 2);
    // expect(r === link1).toBe(true);
    expect(printLinkList(r)).toBe('1->2->3->3->5->6');
  });

  test('n 不合法', () => {
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

    expect(() => removeNthFromEnd(link1, 8)).toThrowError(
      `8 is more than linkList node count`,
    );
  });
});
