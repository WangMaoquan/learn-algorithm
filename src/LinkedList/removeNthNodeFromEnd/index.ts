/**
 * 题目:
 * 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点
 *
 * 示例:
 * 给定一个链表: 1->2->3->4->5, 和 n = 2
 * 当删除了倒数第二个结点后，链表变为 1->2->3->5
 */

import { LinkHead, LinkNode } from '..';

// 双指针 走的快 要比走的慢的 多走 n 个节点位置, 这样当 快的到末尾了, 慢的那个也就是我们需要删除的那个节点了

export const removeNthFromEnd = (linkList: LinkNode, n: number) => {
  const originN = n;
  // 因为存在可能删除的是第一个节点情况 随意我们需要 dummy

  const dummy = new LinkHead();

  dummy.next = linkList;

  let fast = dummy;
  let slow = dummy;

  // 让 fast 先走 n 个节点
  while (n !== 0 && fast.next) {
    fast = fast.next!;
    n--;
  }

  // 检验一下 n 是否合法
  if (n !== 0) {
    throw Error(`${originN} is more than linkList node count`);
  }

  // 这里跳出 while 就表示 fast 到链表尾巴了
  while (fast.next && slow.next) {
    fast = fast.next;
    slow = slow.next;
  }
  // 慢指针删除自己的后继结点
  slow.next = slow.next!.next;

  return dummy.next;
};
