export class ModuleClass {
  test = 'ModuleClass_TEST';
  arr: Array<any> = [ 1, 2, 3, 4, 5 ];

  constructor(arr?: Array<any>) {
    if(arr) this.arr = arr;
  }

  print() {
    console.log(this.test);
    return this.test;
  }

  iterArray( callback: (v: any) => any, fromIt: number = 0, arr?: Array<any> ) {
    if( !arr ) arr = this.arr;

    for( let i = fromIt; i < arr.length; i++) {
      if( Array.isArray( arr[i] ) ) {
        this.iterArray( callback, 0, arr[i] );
      } else {
        callback( arr[i] );
      }
    }
  }

  private *helper( arr: any[], type: { isAll: boolean } ): Generator<any> {
    for( let i = 0; i < arr.length; i++ ) {
      if(type.isAll) yield arr[i]
      if( Array.isArray( arr[i] ) ) {
        yield* this.helper( arr[i], type );
      } else if(!type.isAll) {        
        yield arr[i];
      }
    }
  }

  *generatorReturns(): any {
    for(let val of this.helper(this.arr, { isAll: false })) {
      yield val;
    }
  }

  *genTree(): any {
    for(let val of this.helper(this.arr, { isAll: true })) {
      yield val;
    }
  }
}