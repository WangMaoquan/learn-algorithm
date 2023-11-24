/*

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器。



示例 1：

示例1.png

输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
示例 2：

输入：height = [1,1]
输出：1

提示：

n == height.length
2 <= n <= 105
0 <= height[i] <= 104

*/

/*

定义两个起点, start end, 
end - start 就作为面积的宽, 
height[start] / height[end] 中小的那个作为长

面积就是 Math.max(height[start], height[end]) * (end - start)

然后我们分析下 start, end 应该怎么移动, 也就是我们是移动 大的还是移动小的

移动小的: 水槽的短板 min(h[i],h[j])min(h[i], h[j])min(h[i],h[j]) 可能变大, 因此下个水槽的面积 可能增大
移动大的: 水槽的短板 min(h[i],h[j])min(h[i], h[j])min(h[i],h[j])​ 不变或变小, 因此下个水槽的面积 一定变小

*/

export function maxArea(height: number[]): number {
  let start = 0,
    end = height.length - 1,
    r = 0;
  while (start < end) {
    if (height[start] < height[end]) {
      r = Math.max(r, height[start] * (end - start));
      start++;
    } else {
      r = Math.max(r, height[end] * (end - start));
      end--;
    }
  }
  return r;
}
