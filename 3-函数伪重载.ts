// 不妨先来想象一个场景，在 JavaScript 中，如果一个函数可能存在多种入参组合，比如我们有一个 sum 函数
// 它接受两个参数，基于参数类型的不同，它会执行不同的逻辑并返回不同的值：

// 1. 入参均为数字类型时，相加这两个参数
// 如 sum(1, 2) 返回 3

// 2. 一个参数为数字类型数组，另一个参数为数字类型时，让数组参数中的每个数字加上数字参数，再返回这个数字
// 如 sum(4, [1, 2, 3]) 和 sum([1, 2, 3], 4) 返回 [5, 6, 7]

// 3. 如果两个参数是长度一致的数字类型数组时，依次相加每个数字，返回相加后的数组
// 如 sum([1, 2, 3], [4, 5, 6]) 返回 [5, 7, 9]

// 代码实现
function sum(x, y) {
  const xType = typeof x
  const yType = typeof y
  if (xType === 'number' && yType === 'number') {
    // 1
    return x + y
  } else if (xType === 'number' && Array.isArray(y)) {
    // 2.1
    return y.map((num) => num + x)
  } else if (Array.isArray(x) && yType === 'number') {
    // 2.2
    return x.map((num) => num + y)
  } else if (Array.isArray(x) && Array.isArray(y)) {
    if (x.length !== y.length) return { Error: '数组长度必须一致' }

    // 3
    return x.map((num, i) => num + y[i])
  } else {
    // throw new Error('无效的参数类型')
    return { Error: '无效的参数类型' }
  }
}

console.log(sum(2, 3)) // 5
console.log(sum([1, 2, 3], 4)) // [5, 6, 7]
console.log(sum(5, [1, 2, 3])) // [6, 7, 8]
console.log(sum([1, 2, 3], [4, 5, 6])) // [5, 7, 9]
console.log(sum('a', 'b')) // Error: 无效的参数类型
console.log(sum([1, 2, 3], [4, 5])) // Error: 数组长度必须一致

// 写的这个案例就是函数重载的使用场景，根据不同的入参匹配不同的执行逻辑，一个函数闯天下！
// 但是在 JavaScript 中我们为了解释情况入参作用，在不添加注释的情况，大概率是下面这样
// function sum(numberOrArray1, numberOrArray2) { }
// 参数具体接受什么类型，排列组合是什么样的根本就不情况，所以 TypeScript 的重载来了！

// 上面的例子我们可以这么写：

// 先来个上个章节学的类型别名
type NumberOrArray = number | number[]
type ObjOrNumberOrArray = NumberOrArray | Object

// 根据需求把所有可能出现的入参情况写上
function sum1(base: number, increment: number): number
function sum1(increment: number, baseArray: number[]): number[]
function sum1(baseArray: number[], increment: number): number[]
function sum1(baseArray: number[], incrementArray: number[]): number[]
// NOTE: 标准了每一种可能的重载方式之后，最后实际实现的函数类型标准中，我们需要包括之前存在的各个参数类型和返回值
// 成为一个联合类型，最后一个函数类型标注并不会在函数调用提示中看到，在匹配到重载函数类型后，会显示重载函数的标注类型提示
function sum1(x: NumberOrArray, y: NumberOrArray): ObjOrNumberOrArray {
  if (typeof x === 'number' && typeof y === 'number') {
    // 1
    return x + y
  } else if (typeof x === 'number' && Array.isArray(y)) {
    // 2.1
    return y.map((num) => num + x)
  } else if (Array.isArray(x) && typeof y === 'number') {
    // 2.2
    return x.map((num) => num + y)
  } else if (Array.isArray(x) && Array.isArray(y)) {
    if (x.length !== y.length) return { Error: '数组长度必须一致' }

    // 3
    return x.map((num, i) => num + y[i])
  } else {
    // throw new Error('无效的参数类型')
    return { Error: '无效的参数类型' }
  }
}

console.log(sum1(1, 2))
console.log(sum1(1, [1, 2, 3]))
console.log(sum1([1, 2, 3], 1))
console.log(sum1([1, 2, 3], [2, 3, 4]))

// NOTE: 最后，虽然类型层面做了重载，但说到底其实是 "伪重载"，同样的东西
// 在 Java 中的重载是可以自动根据入参类型分发到对应的方法的……

export {}
