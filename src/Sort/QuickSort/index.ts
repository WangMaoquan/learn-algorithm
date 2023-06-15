/**
 * 快速排序
 * 快速排序在基本思想上和归并排序是一致的，仍然坚持“分而治之”的原则不动摇。
 * 区别在于，快速排序并不会把真的数组分割开来再合并到一个新数组中去，而是直接在原有的数组内部进行排序
 *
 * 以一个值为标准(基准值) 最后我们要形成的是一个  左边的一定比这个基准值小(不能保证左边有序), 右边的一定比这个基准值大(不能保证右边有序)
 *
 * 所以我们第二次 就以 0, base 再去以上面的逻辑, base+1, end 再去以上面的逻辑
 *
 * 最后完成的就是我们需要的数组
 *
 * 最好时间复杂度：它对应的是这种情况——我们每次选择基准值，都刚好是当前子数组的中间数。这时，可以确保每一次分割都能将数组分为两半，进而只需要递归 log(n) 次。这时，快速排序的时间复杂度分析思路和归并排序相似，最后结果也是 O(nlog(n))。
 * 最坏时间复杂度：每次划分取到的都是当前数组中的最大值/最小值。大家可以尝试把这种情况代入快排的思路中，你会发现此时快排已经退化为了冒泡排序，对应的时间复杂度是 O(n^2)。
 * 平均时间复杂度： O(nlog(n))
 */

export function quickSort(arr: number[], left = 0, right = arr.length - 1) {
  if (arr.length > 1) {
    const lineIndex = partition(arr, left, right);
    // 如果左边子数组的长度不小于1，则递归快排这个子数组
    if (left < lineIndex - 1) {
      // 左子数组以 lineIndex-1 为右边界
      quickSort(arr, left, lineIndex - 1);
    }
    // 如果右边子数组的长度不小于1，则递归快排这个子数组
    if (lineIndex < right) {
      // 右子数组以 lineIndex 为左边界
      quickSort(arr, lineIndex, right);
    }
  }
  return arr;
}

function partition(arr: number[], left: number, right: number) {
  const mid = Math.floor(left + (right - left) / 2);
  let baseValue = arr[mid];
  let i = left;
  let j = right;

  // 当左右指针不越界时，循环执行以下逻辑
  while (i <= j) {
    // 左指针所指元素若小于基准值，则右移左指针
    while (arr[i] < baseValue) {
      i++;
    }
    // 右指针所指元素大于基准值，则左移右指针
    while (arr[j] > baseValue) {
      j--;
    }

    // 若i<=j，则意味着基准值左边存在较大元素或右边存在较小元素，交换两个元素确保左右两侧有序
    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  // 返回左指针索引作为下一次划分左右子数组的依据
  return i;
}

function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
