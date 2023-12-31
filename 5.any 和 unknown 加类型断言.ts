// anyScript!!!

let x: any = 1
x = '1'
x = true

// NOTE: 不知道对一个变量应该提供什么类型时，可以使用 any 类型作为临时过渡方案
// 因为 any = 万能类型 + 放弃类型检查，所有我们既然选择 TypeScript 就不应该滥用 any

// 还有一个家伙叫 unknown，用于表示万能类型的同时还能保留类型检查，是不是很不错？
myFunc({})
myFunc([])
myFunc(true)

function myFunc(param: unknown) {
  // 当我们尝试在函数内使用参数是，此时 unknown 的类型检查就生效了
  // param.forEach((element) => {}) // ERROR: "param" 的类型为 "未知"

  // 很明显，我们希望上面的 "param" 是一个数组类型，这时就可以使用类型断言来解决这个问题了
  ;(param as unknown[]).forEach((element) => {})

  // 这个时候你又想到，如果我希望 param 数组内的元素都是 number 类型，那么怎么办呢？
  // 当然有办法！两种方案，还是类型断言
  ;(param as number[]).forEach((num) => num + 1)
  ;(param as unknown[]).forEach((num) => (num as number) + 1)
}

// 类型断言可能的使用场景
interface User {
  name: string
  job?: Job
}

interface Job {
  title: string
}

const user: User = {
  name: 'feng',
  job: {
    title: 'engineer',
  },
}

const { name: userName, job = {} } = user

// const title = job.title // ERROR: 类型 "{}" 不存在属性 "title"
// 这时因为我们在第一次解构赋值时将 {} 空对象作为 job 的默认值，导致 TypeScript 会认为此时的 job 的类型
// 就是一个空对象，所以在我们想用 job.title 时就无法拿到，要解决这个问题，我们还是可以使用类型断言
const title = (job as Job).title
