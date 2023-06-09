/**
 * 冒泡排序
 *
 * 其实就是 从第一个数开始与后面的进行比较, 如果 大于(小于) 就交换, 不然就不变
 *
 * 最后一遍又一遍的下来, 最大值(最小值) 就像冒泡一样 到了尾巴
 *
 * 这就是冒泡排序
 *
 * 冒泡排序的时间复杂度
 *
 * 最好时间复杂度: 它对应的是数组本身有序这种情况, 在这种情况下, 我们只需要作比较（n-1 次, 而不需要做交换, 时间复杂度为 O(n)
 * 最坏时间复杂度: 它对应的是数组完全逆序这种情况, 在这种情况下, 每一轮内层循环都要执行, 重复的总次数是 n(n-1)/2 次, 因此时间复杂度是 O(n^2)
 * 平均时间复杂度：记住平均时间复杂度是 O(n^2) 即可
 */

export function baseBubbleSort(arr: number[]) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    // 这里我们其实发现 len - i - 1 其实已经是有序了, 我们不需要再比较
    // 所以可以改进
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换两者
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

export function betterBubbleSort(arr: number[]) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    // 注意差别在这行，我们对内层循环的范围作了限制
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 其实上面两种 都有着问题, 就是传入的是一个有序的 数组, 也会进行两重for 循环
// 那么我们怎么来优化呢? 很简单 设置一个标志啊

export function moreBetterBubbleSort(arr: number[]) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let flag = false; // 增加是否有序的标志
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
      }
    }
    if (flag === false) {
      return arr;
    }
  }
  return arr;
}
