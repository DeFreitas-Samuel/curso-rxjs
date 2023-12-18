import { first, fromEvent, map } from "rxjs";


const click$ = fromEvent<MouseEvent>(document, 'click')

const firstObs$ = click$.pipe(
    first()// en este caso seria igual a un take(1)
)

firstObs$.subscribe({
    next: next => console.log(next),
    complete: () => console.log('complete')
})

const secondObs$ = click$.pipe(
    map<MouseEvent, any>(({ clientX, clientY }) => ({ clientX, clientY })),
    first(event => event.clientX > 350) // Tambien le puedo pasar un predicado que tiene una condicion
    // Con esa condicion solo emitira el primer valor que cumpla esa condicion y no la primera emision
)

secondObs$.subscribe({
    next: next => console.log(next),
    complete: () => console.log('second complete')
})