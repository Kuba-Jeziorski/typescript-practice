// interface Person {
//   // we can only define structure - not concrete values
//   // name: string = 'Max' -> NO

//  // there could be only readonly type added (no public/private)
//  // readonly name: string // that makes sure that this prop won't be changed
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// // using interface as type
// let user1: Person;

// user1 = {
//   name: "Max",
//   age: 30,
//   greet(phrase: string) {
//     console.log(`${phrase} ${this.name}`);
//   },
// };

// user1.greet(`Hi, my name is`);

// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name: string;
  // question mark make property optional
  outputName?: string;
}

interface Greetable extends Named {
  name: string;
  greet(phrase: string): void;
}

class Person implements Greetable {
  // Greetable is extended by Named, so when name is removed there's error
  // name must be present becouse of interface Named
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

let user1: Greetable;

user1 = new Person("Max");

user1.greet(`Hi, my name is`);
console.log(user1);
