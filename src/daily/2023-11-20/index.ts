/*

n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
相邻两个孩子评分更高的孩子会获得更多的糖果。
请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目

示例 1：

输入：ratings = [1,0,2]
输出：5
解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
示例 2：

输入：ratings = [1,2,2]
输出：4
解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。


提示：

n == ratings.length
1 <= n <= 2 * 104
0 <= ratings[i] <= 2 * 104

*/

/*
  两个两个比较, 分高的糖果多
  存在连续递增, 存在连续递减, 怎么定义 糖果?
  
  自己思路: 寻找 ratings 中 分数递增到递减的区间, 然后分别处理这些区间, 区间需要的最多的糖果数 其实是递减的长度

  怎么寻找?

*/

interface RangeStore {
  l2h: number[]; // 递增
  h2l: number[]; // 递减
}

function createRangeStore(): RangeStore {
  return {
    l2h: [],
    h2l: [],
  };
}

export function createRangeStores(ratings: number[]): RangeStore[] {
  const r: RangeStore[] = [];
  let h2l = false;
  let needBreak = false;
  let i = 0;
  while (i < ratings.length) {
    let j = i;
    if (needBreak) {
      break;
    }
    const rangeStore = createRangeStore();
    if (j === ratings.length - 1) {
      rangeStore.h2l.push(ratings[j]);
      r.push(rangeStore);
      break;
    }
    while (j < ratings.length - 1) {
      if (ratings[j] <= ratings[j + 1]) {
        if (h2l) {
          break;
        }
        rangeStore.l2h.push(ratings[j]);
        if (j + 1 === ratings.length - 1) {
          rangeStore.l2h.push(ratings[j + 1]);
          needBreak = true;
        }
      } else {
        rangeStore.h2l.push(ratings[j]);
        if (j + 1 === ratings.length - 1) {
          rangeStore.h2l.push(ratings[j + 1]);
          needBreak = true;
        }
        h2l = true;
      }
      j++;
    }
    i = j;
    h2l = false;
    r.push(rangeStore);
  }
  return r;
}

const candySum = (ratings: number[], maxCandy: number) => {
  let sum = 0;
  let start = 0;
  let min = ratings[0];
  if (ratings.length === 1) {
    return maxCandy;
  }
  if (ratings.length === 0) {
    return 0;
  }

  while (start < ratings.length) {
    if (ratings[start] < min) {
      min = ratings[start];
      --maxCandy;
      sum += maxCandy;
    } else if (
      ratings[start + 1] !== undefined &&
      ratings[start] === ratings[start + 1]
    ) {
      sum += 1;
    } else {
      sum += maxCandy;
    }
    start++;
  }
  return sum;
};

export function candy(ratings: number[]): number {
  const rangsStores = createRangeStores(ratings);
  let r = 0;
  for (let i = rangsStores.length - 1; i >= 0; i--) {
    const { l2h, h2l } = rangsStores[i];

    let maxCandy = new Set(h2l).size;
    // 处理 递减
    // 处理 存在 递减 然后递增的情况
    maxCandy = maxCandy === 1 ? 2 : maxCandy;
    const r1 = candySum(h2l, maxCandy);

    // 处理递增
    // 1. h2l 长度为 0
    maxCandy = maxCandy === 0 ? new Set(l2h).size : maxCandy;
    const r2 = candySum(l2h.slice().reverse(), maxCandy);
    r = r + r1 + r2;
  }
  return r;
}
