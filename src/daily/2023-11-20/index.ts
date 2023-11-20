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
        rangeStore.l2h.push(ratings[j]);
        if (j + 1 === ratings.length - 1) {
          rangeStore.l2h.push(ratings[j + 1]);
          needBreak = true;
        }
      } else {
        break;
      }
      j++;
    }
    while (j < ratings.length - 1) {
      if (ratings[j] >= ratings[j + 1]) {
        rangeStore.h2l.push(ratings[j]);
        if (j + 1 === ratings.length - 1) {
          rangeStore.h2l.push(ratings[j + 1]);
          needBreak = true;
        }
      } else {
        break;
      }
      j++;
    }
    i = j;
    h2l = false;
    r.push(rangeStore);
  }
  return r;
}

export const candyH2LSum = (ratings: number[], preCandy: number = 1) => {
  let sum = 0;
  let c = preCandy;
  for (let i = ratings.length - 1; i >= 0; i--) {
    if (ratings[i + 1] && ratings[i] === ratings[i + 1]) {
      sum += 1;
      --c;
    } else {
      sum += c;
      i !== 0 && ++c;
    }
  }
  return {
    sum,
    c,
  };
};

export const candyL2HSum = (ratings: number[], preCandy: number) => {
  let sum = 0;
  let c = 1;
  for (let i = 0; i < ratings.length; i++) {
    if (ratings[i] === ratings[i - 1]) {
      sum += 1;
      c--;
    } else {
      sum += c;
      i !== ratings.length - 1 && ++c;
    }
  }
  return {
    sum,
    c,
  };
};

export function candy(ratings: number[]): number {
  const rangsStores = createRangeStores(ratings);
  let r = 0;
  let pre = 1;
  for (let i = rangsStores.length - 1; i >= 0; i--) {
    const { l2h, h2l } = rangsStores[i];

    let { sum: r1 = 0, c: maxCandy = 1 } =
      h2l.length === 0 ? {} : candyH2LSum(h2l, pre);

    let { sum: r2 = 0, c: prevCandy = 1 } =
      l2h.length === 0 ? {} : candyL2HSum(l2h, maxCandy);
    r = r + r1 + r2;
    pre = prevCandy;
  }
  return r;
}
