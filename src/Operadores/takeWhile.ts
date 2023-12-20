import { fromEvent, map, takeWhile } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, 'click')

const firstObs$ = click$.pipe(
    map(({ x, y }) => ({ x, y })),
    takeWhile(event => event.y < 150)// Va a emitir valores hasta que reciba una emision que no 
    // cumpla con la condicion, entonces en ese momento dejara de emitir
    // No emitira el valor que rompio la condicion al menos que se le pase true como segundo parametro
    // a takeWhile
)
    .subscribe(
        console.log
    )

