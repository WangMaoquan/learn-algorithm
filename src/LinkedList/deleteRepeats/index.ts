/**
 * 题目:
 * 给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字
 *
 * 示例 1:
 * 输入: 1->2->3->3->4->4->5
 * 输出: 1->2->5
 *
 * 示例 2:
 * 输入: 1->1->1->2->3
 * 输出: 2->3
 */

import { LinkHead, LinkNode, normalizeHead } from '..';

// 链表做删除的时候 最主要的是要知道 前驱结点

export const deleteRepeatValues = (linkList: LinkHead | LinkNode) => {
  let normalize = normalizeHead(linkList);
  if (!normalize || !normalize.next) {
    return linkList;
  }
  let dummy = new LinkHead();
  dummy.next = normalize;

  let cur = dummy;

  // 处理 连续相等 的值
  while (cur.next && cur.next.next) {
    // 假如存在想等值
    if (cur.next.value === cur.next.next.value) {
      // 保存值, 用作后面去比较
      let value = cur.next.value;
      // 删除后面 与 value 值相等的节点
      while (cur.next && cur.next.value === value) {
        cur.next = cur.next.next;
      }
    } else {
      // 不存在 就换到下一个节点
      cur = cur.next;
    }
  }

  return dummy.next;
};
