import { distinctUntilChanged, of } from "rxjs";

const numeros$ = of(1, '1', 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 1, 5, 5, 5, 5, 1, 1, 1, 1, 2, 2, 2, 2,)

numeros$.pipe(
    distinctUntilChanged() //With this operator the results logged will be 1, '1', 2, 3, 4, 5, 1, 5, 1, 2 this is because
    // it will emit values that different/distinct from the previous value emitted, but if the same value was printed 
    // before the last emission then it will print it again 
);


const characters$ = of(
    { name: 'sukuna' },
    { name: 'gojo' },
    { name: 'gojo' },
    { name: 'sukuna' },
    { name: 'sukuna' },
    { name: 'gojo' },
    { name: 'gojo' },
    { name: 'sukuna' }
)

characters$.pipe(
    distinctUntilChanged() // If I do it like this then it will print all of the objects because technically even though 
    //  2 objects have the same information they are not the same because they point to different locations 
    // in memory
).subscribe(console.log);

characters$.pipe(
    distinctUntilChanged((prev, curr) => { return prev.name === curr.name }) // If I want to be able to distinct objects 
    // then I have to pass a callback function that takes 2 parameter. The last emission and the current one, and choose 
    // to what property compare if the previous emission is the same as the current one or not. This for objects only.
    // Primitive values need not of such distinction
).subscribe((next) => console.log(next, 'function distincter'));