// 在 JS 中针对函数我们有两种写法
const handler1 = function (args) {} // 函数表达式
const handler2 = () => {} // 箭头函数表达式

function handler3(args) {} // 函数声明

// 区别在于函数声明会提升作用域，可以在函数声明前调用，而函数表达式不行
// 下面我们来看看 TypeScript 中如何给这两种方式定义类型

// 函数表达式
const sum1 = function (a: number, b: number): number {
  return a + b
}
// 函数声明式
function sum2(a: number, b: number): number {
  return a + b
}

// 你可能会想，能不能用 `const sum: 函数类型 =` 的方式来进行标注呢？答案是可以的
// 首先我们要声明一个独立的函数类型
type Sum = (a: number, b: number) => number
// `type Sum =` 声明了一个类型别名，它作用和 `interface` 基本一样，我们先用就行啦
// 此时就不需要给表达式参数和返回值标准类型了，TypeScript 会自动从 Sum 类型中推断，匹配起来
const sum3: Sum = (a, b) => a + b

// 关于函数返回类型标注 void 和 undefined 的情况
function handler4(): void {}
// NOTE: 在 5.1 版本之前，标注返回类型为 undefined 需要显示的 return 语句
// 而在 5.1 中，TS 进行了修正，允许隐式返回
function handler5(): undefined {}

export {}
