// // generic type; its known that all of array items will be strings
// // we can be sure that, for example names[0].split(' ') will work (if it is not empty)
// const names: Array<string> = ["Max", "Manuel"];

// // resolve is string so Promise<string>
// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(()=> {
//         resolve('This is done!')
//     }, 2000)
// });

// generic function
// generic types constrains -> T extends object
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max", hobbies: ["Sport"] }, { age: 30 });
console.log(mergedObj);

// that makes sure that element (parameter in below function) has length
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = `Got 1 elements.`;
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements.`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(`Hi there!`));

// 'key' (U) is key in object (T)
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return `Value: ${obj[key]}`;
}

extractAndConvert({ name: "Max" }, "name");

// strongly typed but flexible
// class DataStorage<T> {
// its hard to work on non-primitives types; DataStorage should works only with primitives
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

// T -> string
const textStorage = new DataStorage<string>();
textStorage.addItem(`Max`);
textStorage.addItem(`Manu`);
textStorage.removeItem(`Max`);
console.log(textStorage.getItems());

// T can be changed (even for union types);
const numberStorage = new DataStorage<number>();

// object are not allowed due to primitives types condition (string/number/boolean)
// const objStorage = new DataStorage<object>();
// const maxObj = { name: "Max" };
// objStorage.addItem(maxObj);
// objStorage.addItem({ name: "Manu" });
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // Partial makes all option (interface CourseGoal) optional, so courseGoal (object below) can be empty
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  // Partial must be type casted as CourseGoal
  return courseGoal as CourseGoal;
}

// Readonly<string[]> doesn't let to manipulate array
const names: Readonly<string[]> = ["Max", "Anna"];
// names.push('Manu');
// names.pop();
