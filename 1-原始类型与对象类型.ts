// 原始类型标准，通过 `:` 加上类型，后面类型都以 type 简称
const userName: string = 'fengstats'
const userAge: number = 18
const userMarried: boolean = false

// 对象类型则需要展开说明下
// 首先是数组类型，有两个方式可以描述一个数组类型如：
// 1. type[]
// 2. Array<type>
const userNames1: string[] = []
const userNames2: Array<string> = []

// 其次是对象类型，我们需要先使用 TypeScript 语法来编写一个 interface (接口)
interface User {
  userName: string
  userAge: number
  userMarried: boolean
}
// 使用该接口进行类型标准
const user: User = {
  userName: 'fengstats',
  userAge: 18,
  userMarried: false,
}
// 看起来是不是很奇怪，好像我们把一个对象类型写了两遍一样，其实不然，将对象类型抽象成一个 interface 接口
// 可以使我们在后续更加方便的复用这个类型标准

// 对象类型的接口加上数组类型，下面就是一个描述一个对象数组的方式
const userList: User[] = [
  {
    userName: 'fengstats',
    userAge: 18,
    userMarried: false,
  },
  {
    userName: 'fengstats',
    userAge: 20,
    userMarried: true,
  },
]

// 注意使用接口意味着我们必须要遵守这个接口定义的属性，不能多也不能少，否则会报错

// 所以若存在可能有也可能没有的属性，我们可以用可选标记，如：
interface User2 {
  userName: string
  userAge?: number // 属性 userAge 可选
}

// 我们在 JS 中可能会使用对象来存储常量避免项目中出现 Magic Value（莫名其妙的值）或者是 Hard Code（硬编码）
// 没有注释的情况下，我们只能去猜测这个值到底是什么
const userPriority = {
  HIGH: 1,
  MIDDLE: 2,
  LOW: 3,
}
const priority1 = userPriority.HIGH

// 而到了 TypeScript 中给我们提供了一个更好的常量定义方式，我们也可以使用枚举类型来定义常量
enum UserPriority {
  HIGH = 1,
  MIDDLE = 2,
  LOW = 3,
}
// 看起来貌似没什么不同？只是换了个写法而已，枚举能带来更明显的好处，首先最主要的就是
// 相比于对象，枚举能带来更清晰的提示信息，我们可以直接在代码提示时看到这个枚举成员的值！（鼠标悬浮上去）
const priority2 = UserPriority.MIDDLE

// 同时，对于数字类型的值，枚举能够自动累加值，不需要全部都写
enum UserPriority2 {
  HIGH = 1,
  MIDDLE, // 2
  LOW, // 3
}
const priority3 = UserPriority2.LOW

// 枚举中也可以支持字符串、函数计算成员等等

// 随着 ES6 的引入，Set 和 Map 类型也被更多人使用，对这两种类型的标准类似与数组类型中的 Array<type>
const set = new Set<number>()
set.add(1)
// set.add('2') // ERROR: 类型错误

const map = new Map<string, number>()
map.set('1', 2)
// map.set(2, 1) // ERROR: 类型错误

// 使其变成一个空模块导出，避免 TypeScript 变量提示错误，保证无依赖关系
export {}
