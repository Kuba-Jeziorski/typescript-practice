console.log(`test`);
// const userName = "Max";
// userName = 'Maximillian';
// let age = 30;

// age = 29;

// const add = (a: number, b: number) => a + b;

// console.log(add(2, 5));

const person = {
  firstName: "Max",
  age: 30,
};

const copiedPerson = { ...person };

const add = (...numbers: number[]) => {
  let result = 0;
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

const [hobby1, hobby2] = hobbies;

const { firstName: userName, age } = person;

console.log(userName, age);

console.log(person);
