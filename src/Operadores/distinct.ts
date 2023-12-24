import { distinct, of } from "rxjs";

const numeros$ = of(1, '1', 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 1, 5, 5, 5, 5, 1, 1, 1, 1, 2, 2, 2, 2,)

numeros$.pipe(
    distinct() //With this operator the results logged will be 1, '1', 2, 3, 4 and 5 it doesnt matter that
    // there are some ones and 2 repeated later in the array, what it matters is that they have already
    // been emited so they will never be emited again
).subscribe(console.log);


const characters$ = of(
    { name: 'sukuna' },
    { name: 'gojo' },
    { name: 'todou' },
    { name: 'mahoraga' },
    { name: 'sukuna' },
    { name: 'gojo' },
    { name: 'todou' },
    { name: 'mahoraga' }
)

characters$.pipe(
    distinct() // If I do it like this then it will print all of the objects because technically even though 
    //  2 objects have the same information they are not the same because they point to different locations 
    // in memory
).subscribe(console.log);

characters$.pipe(
    distinct(c => c.name) // If I want to be able to distinct objects then I have to pass a parameter to the 
    // distint the property (with a primitive value) that I want to evaluate my objects to see if they are
    // distinct or not
).subscribe(console.log);