/**
给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。


示例 1：

输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。

注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
示例 2：

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。


提示：

1 <= prices.length <= 105
0 <= prices[i] <= 104

*/

/***
 * 分析题大概意思就是
 *
 * 找到 prices 中 差值最大的组合, 注意小值只能在前面
 *
 * 特殊情况 prices[0] 是最大值, 就是不能完成交易, 利润是0
 *
 */

export function maxProfit(prices: number[]): number {
  const stack: number[][] = []; /** [min max] 这样的 或者 [max] */
  let diff = 0;
  let diffFlag = false;
  for (let i = 0; i < prices.length; i++) {
    const last = stack[1];
    if (last) {
      const [maxPrice, maxIndex] = last;
      if (maxPrice < prices[i]) {
        stack[1] = [prices[i], i];
        if (prices[i] - stack[0][0] > diff) {
          diffFlag = true;
          diff = prices[i] - stack[0][0];
        }
      } else {
        const [min] = stack[0];
        if (min > prices[i]) {
          if (i < prices.length - 2) {
            stack.length = 0;
            stack.push([prices[i], i]);
          } else {
            const rest = prices.slice(i);
            if (rest.length === 2) {
              const diff = stack[1][0] - stack[0][0];
              const currDiff = rest[1] - rest[0];
              return diff < currDiff ? currDiff : diff;
            }
          }
        }
      }
    } else {
      const [min] = stack[0] || [];
      if (min && min > prices[i]) {
        stack[0] = [prices[i], i];
      } else {
        stack.push([prices[i], i]);
        if (diff < prices[i] - stack[0][0]) {
          diff = prices[i] - stack[0][0];
          diffFlag = true;
        }
      }
    }
  }
  if (!diffFlag) {
    return 0;
  } else {
    return diff;
  }
}
