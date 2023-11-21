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

interface Ranges {
  ratings: number[];
  type: 'l2h' | 'h2l';
}

export function createRanges(ratings: number[]): Ranges[] {
  const r: Ranges[] = [];
  let needBreak = false;
  let i = 0;
  while (i < ratings.length) {
    let j = i;
    if (needBreak) {
      break;
    }
    let temp = [];
    while (j < ratings.length - 1) {
      if (ratings[j] <= ratings[j + 1]) {
        temp.push(ratings[j]);
        if (j + 1 === ratings.length - 1) {
          temp.push(ratings[j + 1]);
          needBreak = true;
        }
      } else {
        break;
      }
      j++;
    }
    temp.length !== 0 &&
      r.push({
        type: 'l2h',
        ratings: temp,
      });
    temp = [];
    while (j < ratings.length - 1) {
      if (ratings[j] >= ratings[j + 1]) {
        temp.push(ratings[j]);
        if (j + 1 === ratings.length - 1) {
          temp.push(ratings[j + 1]);
          needBreak = true;
        }
      } else {
        break;
      }
      j++;
    }
    i = j;
    temp.length !== 0 &&
      r.push({
        type: 'h2l',
        ratings: temp,
      });
  }
  return r;
}

export function createRangeStores(ratings: number[]): RangeStore[] {
  const r: RangeStore[] = [];
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

export const candyL2HSum = (ratings: number[]) => {
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

export function candy1(ratings: number[]): number {
  const rangs = createRanges(ratings);
  let r = 0;
  let pre = 1;
  if (rangs[0].type === 'l2h') {
    for (let i = 0; i < rangs.length; i++) {
      const { type, ratings: rs } = rangs[i];
      const { sum, c } =
        type === 'h2l' ? candyH2LSum(rs, pre) : candyL2HSum(rs);
      r += sum;
      pre = c;
    }
  } else {
    for (let i = rangs.length - 1; i >= 0; i--) {
      const { type, ratings: rs } = rangs[i];
      const { sum, c } =
        type === 'h2l' ? candyH2LSum(rs, pre) : candyL2HSum(rs);
      r += sum;
      pre = c;
    }
  }

  return r;
}

/**
 * 切记不可左右一起考虑, 会炸
 */

export function candy(ratings: number[]): number {
  const candies: number[] = [];
  candies[0] = 1;
  // 保证右边高分孩子一定比左边低分孩子发更多的糖果
  for (let i = 1, length = ratings.length; i < length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    } else {
      candies[i] = 1;
    }
  }
  // 保证左边高分孩子一定比右边低分孩子发更多的糖果
  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }
  return candies.reduce((pre, cur) => pre + cur);
}
