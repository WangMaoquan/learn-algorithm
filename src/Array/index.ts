/**
 * 什么是数组?
 * 有序排列的的相同类型元素的集合
 * javascript 是弱类型 所以 不考虑 相同类型
 *
 * 首先我们必须的了解怎么去创建数组, 数组原型上的方法
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
 */

/**
 * javascript 描述
 *
 * 1. js中的数组长度可以随意调整大小, 可以包含不同的数据类型 (不需要这些特征时, 即长度要固定, 必须是同一类型, 可以使用 [类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays) )
 * 2. js数组不是关联数组 (关联即映射), 因此, 不能使用任意字符串作为索引访问数组元素, 但必须使用非负整数(或对应的字符串形式) 作为访问索引
 * 3. js数组索引从0开始
 * 4. js数组复制操作是浅拷贝 (所有javascript 对象的标准的内置复制操作都是 `浅拷贝` )
 */

/**
 * JavaScript 数组的 length 属性和数值属性是连接的
 *
 * 比如 `push, pop, unshift, shift, indexOf, slice, join`
 *
 * 当我们设置一个有效的 正整数下标时, 大于数组长度 会将该下标值更新为 length的值, 小于则是修改对应位置的值
 *
 * 我们也可以直接修改 length, 大于之前的length 会扩充, 小于则会 截取
 */

/**
 * 稀疏数组中的 空槽(我的理解就是 使用 empty 占位的) 在数组方法之间的行为不一致。通常，旧方法会跳过空槽，而新方法将它们视为 undefined
 *
 * 在遍历多个元素的方法中，下面的方法在访问索引之前执行 in 检查，并且不将空槽与 undefined 合并
 * 1. concat
 * 2. copywithin
 * 3. every
 * 4. filter
 * 5. flat
 * 6. flatMap
 * 7. forEach
 * 8. indexOf
 * 9. lastIndexOf
 * 10. map
 * 11. reduce
 * 12. reduceRight
 * 13. reverse
 * 14. slice
 * 15. some
 * 16. sort
 * 17. splice
 *
 * 这些方法将空槽视为 undefined
 * 1. entries
 * 2. fill
 * 3. find
 * 4. findIndex
 * 5. findeLast
 * 6. group
 * 7. groupToMap
 * 8. includes
 * 9. join
 * 10. keys
 * 11. toLocaleString
 * 12. values
 */

/**
 * 以下方法通过访问 this.constructor[Symbol.species] 来创建新数组，以确定要使用的构造函数
 * 1. concat
 * 2. filter
 * 3. flat
 * 4. flatMap
 * 5. map
 * 6. slice
 * 7. splice
 *
 * 以下方法总是使用 Array 基础构造函数创建新数组
 * 1. toReversed
 * 2. toSorted
 * 3. toSpliced
 * 4. with
 */

/**
 * 数组的迭代方法
 *
 * 许多数组方法接受一个回调函数作为参数。回调函数按顺序为数组中的每个元素调用，且最多调用一次，并且回调函数的返回值用于确定方法的返回值。它们都具有相同的方法签名
 *
 * method(callbackFn, thisArg)
 *
 * callbackFn = (element, index, array) => {};
 *
 * 1. every
 * 2. filter
 * 3. find
 * 4. findIndex
 * 5. findLast
 * 6. findLastIndex
 * 7. flatMap
 * 8. forEach
 * 9. map
 * 10. some
 * 11. group
 * 12. groupToMap
 *
 * 其中 `every, find, findIndex, findLast, findLastIndex, some` 并不会是在每个元素上调用 callbackFn——它们在确定返回值后立即停止迭代
 *
 * reduce 和 reduceRight 没有指定this
 *
 * sort 也不会指定 this 但是可能在索引上多次调用 cb
 */

/***
 * 创建数组
 * 只传入一个参数的话, 如果该参数是一个整数 则作为 返回数组的 length, 即 创建了一个长度了 x 的数组
 * 不是整数, 是别的(如字符串), 则 返回的数组第一项的值为 传入的 x
 *
 * 传入多个参数 则作为 数组的 第1项, 第二项, 第 n 项的值
 */

// 使用 构造函数
const arr1 = new Array<number>(1); // arr1 为长度以为1 的数组

const arr2 = new Array<string>('s'); // arr2[1] === "s"

const arr3 = new Array<any>(1, 2, '4'); // [1, 2, "4"]

// 使用数组字面量
const arr4 = [1, 2];

/**
 * Array[Symbol.species]
 * get @@species 被调用的构造函数 (this) 的值。该返回值用于构造创建新数组的数组方法的返回值 简单理解就是返回 构造函数
 *
 * 调用不会改变现有数组但会返回新数组实例的数组方法时 (例如 filter() 和 map()),
 * 将访问数组的 constructor[@@species]。返回的构造函数将用于构造数组方法的返回值。
 * 这使得在技术上使数组方法返回与数组无关的对象成为可能
 */

class LikeArray {
  constructor(public length: number) {
    this.length = length;
  }
}

const testArr = [1, 2, 3];
testArr.constructor = {
  [Symbol.species]: LikeArray,
} as any;

testArr.map((i) => i); // NotAnArray { '0': 0, '1': 1, '2': 2, length: 3 }
testArr.filter((i) => i); // NotAnArray { '0': 1, '1': 2, length: 0 }
testArr.concat([1, 2]); // NotAnArray { '0': 0, '1': 1, '2': 2, '3': 1, '4': 2, length: 5 }

/**
 * 数组的方法
 *
 * 1. [Symbol.iterator]
 *
 * 数组实现了 迭代协议, 允许数组被大多数期望可迭代对象的语法所使用 (如 扩展运算符, for ... of)
 *
 * 返回的是一个 数组迭代器对象
 *
 * ps: Array.values === Array[Symbol.iterator]
 *
 * 什么是 迭代协议?  什么是 可迭代对象?
 *
 * 迭代协议 具体分为两个协议 : 1 可迭代协议 2. 迭代器协议
 *
 * 可迭代协议 必须实现 [Symbol.iterator] 该返回值是一个符合迭代器协议的对象
 *
 *
 * 迭代器协议 定义了产生一系列值（无论是有限个还是无限个）的标准方式，当值为有限个时，所有的值都被迭代完毕后，则会返回一个默认返回值
 *
 * 简单来说 只要实现一个 next 方法 返回一个 { value: xxx, done: boolean } 的对象, 除了 next 方法 还有 throw, return 方法
 *
 * 可迭代对象 中一定有 @@iterator, 可通过常量 Symbol.iterator 访问该属性
 *
 *
 * 2. at(index) 方法接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数, 超出数组长度的返回 undefined
 *
 * 3. concat(source1, source2, ....sourcen) 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组
 *
 * 4. copyWithin(target, start, end) 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度
 *      target 填充开始位置, start 复制元素开始位置(包括start位置的元素), end 为结束位置(不包括end位置元素)
 *      可以理解为 [start, end) 区间的元素 从 target位置开始填充
 *
 * 5. entries 返回 数组迭代器对象 对象包含数组中每个索引的键/值对
 *
 * 6. every(cb, thisArg) 返回一个布尔值, 用测试数组内所有元素是否能通过指定函数的测试
 *    如果中途遇到 cb 返回一个假值, 会中止遍历且返回false
 *    empty 是不会触发 cb的
 *    every 是不会改变原数组, 但是 cb 会
 *
 * 7. fill(value, start, end) 填充数组 会修改原数组 value 填充的值, start 开始下标 end 结束下标 => [start, end) 区间内填充
 *
 * 8. filter(cb, thisArg) 创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素
 *     cb 仅对已分配值的数组索引调用。它不会对稀疏数组中的空槽调用
 *
 * 9. find(cb, thisArg) 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
 *    find 是一个迭代方法, 按照索引升序为数组每一个元素执行cb, 直到cb 返回一个真值, 马上停止迭代
 *    稀疏数组中的empty 会当做 undefined
 *
 * 10. findIndex(cb, thisArg) 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1
 *      findIndex() 是一种迭代方法。它按照索引升序依次遍历数组中的每个元素，并调用提供的 cb 函数，直到 cb 返回一个真值。然后 findIndex() 返回该元素的索引并停止遍历数组
 *      稀疏数组中的empty 会当做undefined
 *
 * 11. findLast 可以理解为是 find 的逆向版本
 *
 * 12. findLastIndex 也可以理解为 findIndex 的逆向版本
 *
 * 13. flat(depth) 方法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中
 *     depth 默认为1
 *     会忽略稀疏数组中的 empty
 *
 * 14. flatMap(cb, thisArg) 方法对数组中的每个元素应用给定的回调函数，然后将结果展开一级，返回一个新数组
 *     可以理解为 map().flat() 这样
 *
 * 15. forEach(cb, thisArg) 方法对数组的每个元素执行一次给定的函数
 *    是一个迭代方法。它按索引升序地为数组中的每个元素调用一次提供的 cb 函数。与 map() 不同，forEach() 总是返回 undefined
 *    只有抛出异常 才会中止循环
 *    forEach() 期望的是一个同步函数，它不会等待 Promise 兑现, 所以不会等 await 没用
 *
 * 16. Array.from(arrayLike, ?mapFn, ?thisArg) 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例
 *       mapFn, thisArg 都是可选的 可以理解为 执行一次 map操作, 不同的是 mapFn 没有第三个参数 array, 因为还在构建中
 *      绝不会创建稀疏数组。如果 arrayLike 对象缺少一些索引属性，那么这些属性在新数组中将是 undefined
 *
 * 17. Array.fromAsync 实验性功能 还不支持
 *     可以由一个异步可迭代对象、可迭代对象或类数组对象创建一个新的、浅拷贝的 Array 实例
 *
 * 18. group 方法根据提供的测试函数返回的字符串值，将调用数组的元素分组。返回的对象具有每个组的单独属性，其中包含组中的元素数组
 *     group(cb, ?thisArg)
 *     group() 方法是一个迭代方法。它为数组中的每个元素调用一次提供的 cb 函数，并返回一个字符串或 symbol（不属于这两种类型的值将被强制转换为字符串），
 *     用于指示元素所属的分组。对于每个由回调函数返回的唯一分组名称，在结果对象中创建一对新属性和数组。每个元素将被添加到其对应分组属性的数组中
 *
 *     empty 表现与 undefined 一样
 *
 *
 * 19. groupToMap(cb, ?thisArg) 方法根据提供的测试函数返回的值对调用数组的元素进行分组。最终返回的 Map 使用测试函数返回的唯一值作为键，可以用于获取每个组中的元素数组
 *
 * 20. includes(searchEle, ?fromIndex) 方法用来判断一个数组是否包含一个指定的值
 *      empty 会当做 undefined
 *      能判断 NaN
 *      -0, +0相等
 *
 * 21. indexOf(serachEle, ?fromIndex) 方法返回数组中第一次出现给定元素的下标，如果不存在则返回 -1
 *      使用的是严格相等
 *       会跳过 empty
 *
 * 22. Array.isArray 静态方法用于确定传递的值是否是一个 Array
 *    Array.isArray() 检查传递的值是否为 Array。它不检查值的原型链，也不依赖于它所附加的 Array 构造函数。
 *    对于使用数组字面量语法或 Array 构造函数创建的任何值，它都会返回 true
 *
 * 23. join(?separator) 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔。如果数组只有一个元素，那么将返回该元素而不使用分隔符
 *     empty 会当做 undefined
 *
 * 24. keys 返回一个数组迭代器对象, 其中包含数组中每个索引的键
 *      empty 会当做 undefined
 */
