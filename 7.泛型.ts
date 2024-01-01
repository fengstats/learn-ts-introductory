// 你看到这个 T 是不是很懵？这什么玩意？别怕，可以理解为它就是函数类型的入参
type Status<T> = 'success' | 'error' | T
type CompleteStatus = Status<'pending'> // 此时的 CompleteStatus 等价于 'success' |'error' | 'pending'

// 我们可以用 JS 中的函数来举例
function statusFunc(T) {
  return ['success', 'error', T]
}
const completeStatusFunc = statusFunc('pending') // 这样是不是就好理解多了！

// 这里的泛型就是参数作用，但是它接收的不是值而是一个类型

// 再来一个场景：比如你想要一个函数，它的入参和出参类型完全相同，你会怎么对这个函数进行精准的类型标注？
// 联合类型
function factory1(input: number | string): number | string {
  return input
}
// 可以看到的是联合类型太有限了，现在只是标准了两个可能的类型
// 那如果要加一个 boolean 呢，或者后期一直加呢？难道都写上去不成？
// 而且在参数提示的时候也不行，比如我们入参输入一个字符串，出参还是会提示可能是字符串和数字，而不是完全相同的类型
factory1('123')

// 所以，这时候还是要请出我们的泛型！
// 函数<声明一个泛型>，然后就可以类似其他类型标准一样使用啦，是不是很简单？
function factory2<T>(input: T): T {
  return input
}
// 什么类型都完全一致！
factory2(123)
factory2('123')
factory2([123])
factory2(true)

// 这时候你可能又要问了，那如果一个泛型不够用咋办？
// 那就定义多个，用逗号 "," 隔开即可
function factory3<T1, T2>(input: T1, input2: T2): T1 {
  console.log(input2)
  return input
}
