
/* const LibraryTest = TestsOf( "TestSectionTitle: ", {
    'Assert w equals': [(res) => assert(2.6 == 2.6), 'assert is checking'],
    'Assert w !equal': [(res) => assert(2 == 1), 'assert is Failing'],
    'Assert Solution': [(res) => assertEquals(9, 3*3), 'assertEquals is checking'],
    'Assert Wrong ==': [(res) => assertEquals(null, !null), 'assertEquals is Failing']
});*/
type TestSuite = {
    [ TestName: string ]: [ assertion: () => void, testCase: string ];
}

interface TestResult {
    [ TestName: string ]: string;
}


export function TestsOf( SectionTitle: string = "Tests of :", suite: TestSuite ): TestResult  {
    let failures = 0;
    let results: TestResult = {};
    noteLog( SectionTitle );
    for( let test in suite ) {
        let [ assertion, testCase ] = suite[ test ];
        try {
            assertion();
            results[test] = cLog( test, testCase );
        } catch (err) {
            failures++;
            if( err instanceof Error ) {
                results[test] = fLog( test, testCase );
                console.log(err.message);
                console.error(err.stack);
            }
        }
    }
    return results;
}

export function FastTestOf( suite: TestSuite ) {
    try {
        for( let test in suite ) {
            let [ assertion, testCase ] = suite[ test ];
            try {
                assertion();
                cLog( test, testCase );
            } catch (err) {
                if( err instanceof Error ) {
                    throw new Error( err.message, { cause: test } );
                }
            }
        }
    } catch (err) {
        if( err instanceof Error ) {
            fLog( err.cause as string, ' ' );
            console.log(err.message);
            console.error(err.stack);
        }
    }
}


export function assert( expression: boolean ) {
    if ( !expression ) {
        throw new Error( 'assert(): FAILED' );
    }
}

export function assertEquals( actual: any, expected: any ) {
    if ( expected != actual ) {
        throw new Error( 'assertEquals() "' + expected + '" != "' + actual + '"' );
    }
}

export function assertStrictEquals( actual: any, expected: any ) {
    if ( expected !== actual ) {
        throw new Error( 'assertStrictEquals() "' + expected + '" !== "' + actual + '"' );
    }
}


const redMsg = '\u001b[1;31m';
const greenMsg = '\u001b[1;32m';
const yellowMsg = '\u001b[1;33m';
const blueMsg = '\u001b[1;34m';
const purpleMsg = '\u001b[1;35m';
// const resetLogColor = '\u001b[0m';

function noteLog(msg: string) {
    console.log( `${purpleMsg}${msg} \u001b[0m` );
}

function cLog(title: string, msg: string) {
    console.log( `${blueMsg}${title}${greenMsg}:   OK   \u001b[0m ${msg}` );
    return title + ':   OK   ' + msg;
}

function fLog(title: string, msg: string) {
    console.log( `${yellowMsg}${title}${redMsg}: FAILED \u001b[0m ${msg}` );
    return title + ': FAILED ' + msg;
}