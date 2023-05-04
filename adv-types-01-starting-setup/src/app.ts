type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// this type is combination of type Admin and type Employee
type ElevatedEmployee = Admin & Employee;

// it is possible to make same result with interface (Employee and Admin must be interfaces)
// interface ElevatedEmployee extends Employee, Admin {}

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// union type (type1 | type2)
type Combinable = string | number;
type Numeric = number | boolean;

// Universal is type: number, becouse Combinable and Numeric only has type: number as common property
type Universal = Combinable & Numeric;

// function overloads
// function add(n: number): number
// function add(a:Combinable, b?: Combinable) {...} // ? - optional
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  // below clause is called type guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add(`Max`, `Schwarz`);
result.split(" ");

const fetchedUserData = {
  id: "u1",
  name: "Max",
  //job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData?.job?.title);

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log(`Name: ${emp.name}`);
//   // way of validation that is accepted by TS; typeof is useless here
//   if (`privileges` in emp) {
//     console.log(`Privileges: ${emp.privileges}`);
//   }
//   if (`startDate` in emp) {
//     console.log(`Start Date: ${emp.startDate}`);
//   }
// }

// printEmployeeInformation(e1);

// class Car {
//   drive() {
//     console.log(`Driving...`);
//   }
// }

// class Truck {
//   drive() {
//     console.log(`Driving a truck...`);
//   }

//   loadCargo(amount: number) {
//     console.log(`Loading cargo... ${amount}`);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();
//   // two ways to make type guard
//   //   if ("loadCargo" in vehicle) {
//   // instanceof works only on classes; doesn't work on interfaces
//   if (vehicle instanceof Truck) {
//     vehicle.loadCargo(1000);
//   }
// }

// useVehicle(v1);
// useVehicle(v2);

// interface Bird {
//   // common property for all (both in this particular example) interfaces
//   type: "bird";
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runningSpeed: number;
// }

// // both interfaces shares common property 'type: ...'
// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case `bird`:
//       speed = animal.flyingSpeed;
//       break;
//     case `horse`:
//       speed = animal.runningSpeed;
//   }
//   console.log(`Moving at speed: ${speed}`);
// }

// moveAnimal({ type: `bird`, flyingSpeed: 10 });

// // const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;
// const userInputElement = document.getElementById(
//   "user-input"
// )! as HTMLInputElement;

// userInputElement.value = `Hi there!`;

// interface ErrorContainer {
//   // property name is string; it's value is string aswell;
//   // this solution let us have as many properties as we want
//   // index properties
//   [prop: string]: string;
// }

// const errorBag: ErrorContainer = {
//   // 1: 'Not a valid email' works aswell, becouse number can be interpreted as string
//   email: "Not a valid email!",
//   username: "Must start with a capital letter!",
// };
