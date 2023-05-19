/**
 * 题目:
 * 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值
 *
 * 示例:
 * 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
 * 输出: [3,3,5,5,6,7]
 *
 * 解释: 滑动窗口的位置
 * [1 3 -1] -3 5 3 6 7
 * 1 [3 -1 -3] 5 3 6 7
 * 1 3 [-1 -3 5] 3 6 7
 * 1 3 -1 [-3 5 3] 6 7
 * 1 3 -1 -3 [5 3 6] 7
 * 1 3 -1 -3 5 [3 6 7]
 *
 * 最大值分别对应：
 * 3 3 5 5 6 7
 */

// 时间复杂度 o(kn)

export const maxSlideWindow = (nums: number[], k: number) => {
  let start = 0;
  let end = k;
  const result: number[] = [];
  while (end <= nums.length) {
    const max = Math.max(...nums.slice(start, end));
    result.push(max);
    start++;
    end++;
  }
  return result;
};

/**
 * 什么是双端队列?
 * 双端队列就是允许在队列的两端进行插入和删除的队列
 *
 * const queue = [1,2,3,4] // 定义一个双端队列
 * queue.push(1) // 双端队列尾部入队
 * queue.pop() // 双端队列尾部出队
 * queue.shift() // 双端队列头部出队
 * queue.unshift(1) // 双端队列头部入队
 */

// 我们只需要维护一个 递减的 下标队列, 队列的第一个元素 就是 滑动窗口中 最大的 那个 index
// 所以我们需要在遍历 数组时 维护 这个队列
// 怎么维护?
// 因为是 递减 所以 新的进入时 要保证之前的元素都要比 新的小, 即 尾出队列
// 现在保证了 新的 进入队列 一定是递减了
// 现在还有一种情况, 就是 当前队列 中的最大值 也就是 队列第一个元素 下标 不在 i - k + 1 ~ i 这个范围内 是不是应该 首出队列
// 然后就是 啥时候开始 将 队列中的 第一个元素 push 进 result 数组里面 是不是遍历的 i 大于等于 k - 1 就可以了

export const maxSlideWindowUseTwoEndQueue = (nums: number[], k: number) => {
  const result: number[] = [];
  const deQueue: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    // 保持 队列 的递减性
    while (deQueue.length && nums[deQueue[deQueue.length - 1]] < nums[i]) {
      deQueue.pop();
    }
    // 入队
    deQueue.push(i);
    // 队列首元素 的范围 至少应该 大于 i - k + 1
    // i - k + 1 就是滑动窗口部分的 起始 index
    while (deQueue.length && deQueue[0] < i - k + 1) {
      deQueue.shift();
    }
    // 判断滑动窗口的状态，只有在被遍历的元素个数大于 k 的时候，才更新结果数组
    if (i >= k - 1) {
      result.push(nums[deQueue[0]]);
    }
  }
  return result;
};
