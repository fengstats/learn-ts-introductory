// Class 是面向对象进行封装、组合、交互后完成需求
// 而我们大部分工作时使用的都是面向过程，不强调封装、组合交互，更强调程序的执行流程
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  getDesc(): string {
    return `${this.name} at ${this.age} years old`
  }
}

// 继承
class Student extends Person {
  grade: number
}

const student = new Student('Alice', 18)
console.log(student.getDesc()) // 继承父类的方法

// 上面我们的 name 和 age 属性在完成实例化赋值之后，就暴露给了外部环境，其实是种不太稳妥的做法
console.log(student.name)
// 我们可以将其标记私有属性
class Person2 {
  private name: string

  constructor(name: string) {
    this.name = name
  }

  // 只能调用 Person 内部方法获取
  public getName() {
    return this.name
  }
}

const person = new Person2('feng')
// console.log(person.name) // ERROR: name 为私有属性只能在类 "Person2" 中访问
console.log(person.getName())

// 当然 Class 也支持重载，语法完全一直，毕竟 Class 的方法和函数本就是一家人
class Person3 {
  get(name: string): string
  get(age: number): number
  get(value: string | number): string | number {
    if (typeof value === 'string') {
      return this.get(`My name is ${value}`)
    } else if (typeof value === 'number') {
      return this.get(`${value} years old`)
    } else {
      throw new Error('Invalid argument type')
    }
  }
}

// 静态成员方法，可以通过类名直接调用
class Person4 {
  static isSameDate() {}
  static diffDate() {}
}
Person4.isSameDate()
Person4.diffDate()
