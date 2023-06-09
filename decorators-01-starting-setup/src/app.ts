// decorator - capital letter
// decorator is executed when class is defined
// function Logger(constructor: Function) {
//   console.log(`Logging...`);
//   console.log(constructor);
// }

// this way of using decorator is better, becouse we have more options of customization
// factory decorators / factory functions
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // console.log(`Rendering template`);
    // const hookEl = document.getElementById(hookId);
    // const p = new originalConstructor();
    // if (hookEl) {
    //   hookEl.innerHTML = template;
    //   hookEl.querySelector("h1")!.textContent = p.name;
    // }
    return class extends originalConstructor {
      constructor(..._: any[]) {
        // constructor in class with extension -> super() needed
        super();
        console.log(`Rendering template`);
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// decorator
// @Logger
// @Logger(`LOGGING - PERSON`)
// class decorators
@Logger("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log(`Creating person object...`);
  }
}

const pers = new Person();

console.log(pers);

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log(`Property decorator!`);
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log(`Accessor decorator!`);
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log(`Method decorator!`);
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log(`Parameter decorator!`);
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  // property decorators
  @Log
  title: string;
  private _price: number;

  // accessor decorator
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error(`Invalid`);
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  // method decorator
  @Log3
  // parameter decorator
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// const p1 = new Product("Book", 19);
// const p2 = new Product("Book 2", 28);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDecriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // bind points on object that causes get to be invoked
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDecriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  // adding method decorator to showMessage()
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
// no need to manually bind p.showMessage (it was need to do that, becouse of this keyword)
button.addEventListener("click", p.showMessage);

// ---

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required','positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.querySelector("#title") as HTMLInputElement;
  const priceEl = document.querySelector("#price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert(`Invalid input`);
  }

  console.log(createdCourse);
});
