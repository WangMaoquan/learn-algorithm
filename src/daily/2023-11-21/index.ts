/*

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水

示例 1：

1.png

输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
示例 2：

输入：height = [4,2,0,3,2,5]
输出：9

提示：

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105

*/

/**
 * 什么时候能够装水?
 * prev < curr < next
 * 是不是遍历到的 curr 处在 中间
 *
 * 我们可以维护一个栈 栈顶存放着最小值, 然后我们用最小值去 和下一个遍历的值比较, 如果比 栈顶大 是不是就是满足了 我上述说的, 就可以装水了
 */

export function trap(height: number[]): number {
  const stack: number[] = []; // 递减栈
  let r = 0; // 雨水的和
  for (let i = 0; i < height.length; i++) {
    // 只有在 stack 不为空的情况下比较
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      /**
       * height[i] 其实就是 next
       * 我们需要怎么去算?
       * 其实就是算面积, 长 * 宽
       * 长其实就是坐标的差 i - pre - 1
       * 宽其实就是高度差, 因为这是是两边都比 curr 高, 我们肯定是取两边的小的那个即 min(height[pre], height[i]) 然后减去 height[curr]
       */
      const curr = stack.pop()!;
      if (!stack.length) {
        break;
      }
      const pre = stack[stack.length - 1];
      const w = i - pre - 1;
      const h = Math.min(height[pre], height[i]) - height[curr];
      r += h * w;
    }
    stack.push(i);
  }
  return r;
}
