import "reflect-metadata";
import { plainToClass } from "class-transformer";

import { Product } from "./product.model";

const products = [
  { title: "A carpet", price: 29.99 },
  { title: "A book", price: 10.99 },
];
// const p1 = new Product("A Book", 12.99);

// vanilla ts solution
// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

// 3rd party library; class-transformer
const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

// console.log(p1.getInformation());
