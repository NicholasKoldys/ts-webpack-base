/**
 * 
 * @param { { callback: Function, args: Array<any> } } param0 
 * @param { number } iter 
 * @returns {number}
 */
export function justRun( { callback, args }
  : { callback: Function, args: Array<any> }, iter = 10000 )
  : number {
  const dur = Date.now();
  for( let i = 0; i < iter; i++ ) {
    if( callback(...args) ) continue;
    else break;
  }
  return (Date.now() - dur);
}

/**
 * 
 * @param { Array<{ callback: Function, args: Array<any> }> } arrayOfFunctions 
 * @returns { { duration: number, returnArray: Array<any> } }
 */
export function runBetween( arrayOfFunctions
  : Array<{ callback: Function, args: Array<any> }> )
  : { duration: number, returnArray: Array<any> } {
  const dur = Date.now();

  let returnArray = new Array();

  for( let i=0; i < arrayOfFunctions.length; i++) {
    returnArray.push( arrayOfFunctions[i].callback( ...arrayOfFunctions[i].args ) );
  }

  return {
    duration: Date.now() - dur,
    returnArray: returnArray,
  };
}