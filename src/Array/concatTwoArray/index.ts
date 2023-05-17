/**
 * 题目:
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组
 *
 * 说明:
 * 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素
 *
 * 实例:
 * 输入: nums1 = [1,2,3,0,0,0], m = 3
 *       nums2 = [2,5,6], n = 3
 * 输出: [1,2,2,3,5,6]
 */

/**
 * 因为两个都是有序的数组, 两个数组从末尾开始比
 *    大的一定是 两个数组元素中最大的, 所以放到 num1 的末尾 (此时num1 的长度 应该是 m + n, 所以应该放到 n + m -1 上)
 *    然后应该指针移动
 *
 *    最后我们要处理的情况是  num1 的指针已经到头, 但是num2 还没有处理完, 所以我们还需要检查一遍 num2 的指针 是否还 大于等于 0
 */

export const mergeUseDoublePointer = (
  num1: number[],
  m: number,
  num2: number[],
  n: number,
) => {
  let e1 = num1.length - 1; // num1 end index
  let e2 = num2.length - 1; // num2 end index
  let ne = m + n - 1; // 最后 new n1 end index

  while (e1 > 0 && e2 > 0) {
    if (num1[e1] >= num2[e2]) {
      num1[ne] = num1[e1];
      e1--;
      ne--;
    } else {
      num1[ne] = num2[e2];
      e2--;
      ne--;
    }
  }

  while (e2 >= 0) {
    num1[ne] = num2[e2];
    e2--;
    ne--;
  }
};

export const mergeUsePush = (
  num1: number[],
  m: number,
  num2: number[],
  n: number,
) => {
  num1.push(...num2);
  num1.sort();
};

export const mergeUseSplice = (
  num1: number[],
  m: number,
  num2: number[],
  n: number,
) => {
  num1.splice(m, 0, ...num2);
  num1.sort();
};
