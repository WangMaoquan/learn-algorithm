/**
 * 题目:
 * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转
 *
 * 1 ≤ m ≤ n ≤ 链表长度
 *
 * 示例
 * 输入: 1->2->3->4->5->NULL, m = 2, n = 4
 * 输出: 1->4->3->2->5->NULL
 */

import { LinkHead, LinkNode } from '..';

type LinkNodeType = null | LinkNode;

/**
 *  1 -> 2 -> 3 -> 4 -> 5
 *
 *  我们需要反转的是 2 - 4
 *
 *  最后的结果是
 * 1 -> 4 -> 3 -> 2 -> 5
 *
 * 反转链表其实我们已经做过了, 所以我们主要的思路是怎么 让 1 的next 指向 4, 以及 2 的next 指向 5
 *
 * 2 指向 5其实很简单 因为 m 到 n 循环结束 n.next 一定是指向 5的
 *
 * 所以我们只需要处理下 1 -> 4 也就是我们只需要修改 m 的 上一个节点 的next, 我们可以把这个节点保存下来
 *
 */

export const reverseBetween = (linkList: LinkNode, m: number, n: number) => {
  let pre: LinkNodeType = null; // 先驱节点
  let cur: LinkNodeType = null; // 循环时的当前节点
  let leftHead: LinkNodeType = null; // 保存 m - 1 的那个节点

  const dummy = new LinkHead(); // 因为 m 可能为0 所以我们自己 制造一个头
  dummy.next = linkList;

  let p: LinkNodeType | LinkHead = dummy; // 遍历到 m - 1 的节点位置

  for (let i = 0; i < m - 1; i++) {
    p && (p = p.next);
  }

  leftHead = p as LinkNodeType; // 从循环出来的 p 一定是 m - 1 处的节点

  let start = leftHead!.next; // 开始反转的起始节点 即 m 出的节点
  pre = start; // pre 是先驱节点 m
  cur = pre!.next; // 获取当前的 节点 m + 1
  // 开始重复反转动作
  for (let i = m; i < n; i++) {
    let next = cur!.next; // 获取next
    cur!.next = pre; // 修改next 级 m + 1 next 指向 m
    pre = cur; // 修改 pre
    cur = next; // 修改 cur
  }

  leftHead!.next = pre; // pre 就是反转后的 第一个节点
  start!.next = cur; // start 保存的 m , 循环完后 m 已经跑到 n 位置去了 所以 start 起始这个时候已经是反转后的 end
  return dummy.next;
};
