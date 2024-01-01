// 联合类型：其实就是 JavaScript 中的逻辑或
type PossibleTypes = string | number

let bar: PossibleTypes = 'bar'
bar = 101

// 字面量形式使用
type Status = 'success' | 'error'
type Code = 200 | 400 | 500
const userStatus: Status = 'success'
const userCode: Code = 200

// 交叉类型：逻辑与
type Name = {
  name: string
}
type Age = {
  age: number
}
interface Sex {
  sex: string
}
type Person = Name & Age & Sex

// 属性缺一不可
const person: Person = {
  name: 'feng',
  age: 18,
  sex: 'male',
}

// 如果交叉两个原始类型会怎样呢？
type Test = number & string // never
// 表示空的，无意义的类型

// 联合类型也可以和交叉类型一起使用
type UnionIntersection = (1 | 2 | 3) & (1 | 2) // 1 | 2
const a: UnionIntersection = 2
