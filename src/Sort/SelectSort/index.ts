/**
 * 选择排序
 *
 * 选择排序的关键字是“最小值(最大值)”：循环遍历数组，
 * 每次都找出当前范围内的最小值(最大值)，把它放在当前范围的头部；然后缩小排序范围，继续重复以上操作，直至数组完全有序为止
 *
 * 时间复杂度  O(n^2)
 */

export function selectSort(arr: number[]) {
  const len = arr.length;

  // 定义 minIndex，缓存当前区间最小值的索引，注意是索引
  let minIndex = 0;
  for (let i = 0; i < len - 1; i++) {
    // 初始化 minIndex 为当前区间第一个元素
    minIndex = i;
    // i、j分别定义当前区间的上下界，i是左边界，j是右边界
    for (let j = i; j < len; j++) {
      // 若 j 处的数据项比当前最小值还要小，则更新最小值索引为 j
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 如果 minIndex 对应元素不是目前的头部元素，则交换两者
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
