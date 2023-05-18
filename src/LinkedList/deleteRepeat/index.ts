/**
 * 题目:
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次
 *
 * 示例 1:
 * 输入: 1->1->2
 * 输出: 1->2
 *
 * 示例 2:
 * 输入: 1->1->2->3->3
 * 输出: 1->2->3
 */

import { LinkHead, LinkNode, normalizeHead } from '..';

export const deleteRepeatValue = <T>(linkList: LinkNode<T> | LinkHead<T>) => {
  let current = normalizeHead(linkList);

  while (current && current.next) {
    if (current.value === current.next.value) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return linkList;
};
