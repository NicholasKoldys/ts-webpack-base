import { ModuleClass } from "./ModuleClass.js";
import { isNumber } from "./IsNumbers.js";

console.log('Hello World');

let a: Number = 20;
let b: string = '30';
let c: string = 'world';

console.log('Is a number: ', isNumber( a ));
console.log('Is a number: ', isNumber( b ));
console.log('Is c number: ', isNumber( c ));

const MC = new ModuleClass();

console.log('MCs array: ', MC.arr);

for( let val of MC.generatorReturns() ) {
  console.log('MC gen: ', val);
}

let layeredArr = [
  '00',
  [ '1A', '2A' ],
  '1B',
  [ '1C', '2C', '3C' ]
];

const LMC = new ModuleClass( layeredArr );

console.log('LMCs array: ', LMC.arr);

for( let val of LMC.generatorReturns() ) {
  console.log('LMC gen: ', val);
}

for( let val of LMC.genTree() ) {
  console.log('Tree: ', val);
}

export const testVar = "Hello Test";