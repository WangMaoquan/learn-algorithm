/**
 * 题目:
 * 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替
 *
 * 提示:
 * 气温 列表长度的范围是 [1, 30000]
 * 每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数
 *
 * 示例
 * 输入 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
 * 输出 [1, 1, 4, 2, 1, 1, 0, 0]
 */

// 思路就是 栈中保留的是 之前的下标
// 取出栈顶的元素 与遍历到的当前的元素比较
// 取出的比 当前的大 说明不会出现升温 所以之间 进栈
// 小的话 就出栈 然后修改 resutl 对应 栈顶元素 位置 的值修改了
export const dailyTemperature = (temperature: number[]) => {
  const len = temperature.length;

  const result = new Array<number>(len).fill(0);

  // 保存 下标的 栈
  const indexStack: number[] = [];

  for (let i = 0; i < len; i++) {
    while (
      indexStack.length &&
      temperature[i] > temperature[indexStack[indexStack.length - 1]]
    ) {
      const top = indexStack.pop()!;
      result[top] = i - top;
    }
    indexStack.push(i);
  }

  return result;
};
