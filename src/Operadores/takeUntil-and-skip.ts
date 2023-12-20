import { fromEvent, interval, skip, takeUntil, tap } from "rxjs";

const button = document.createElement('button')

button.innerHTML = 'Stop';

document.querySelector('body')?.append(button)

const counter$ = interval(1000);

const obsClick$ = fromEvent(button, 'click')
    .pipe(
        tap(() => console.log('antes de skip')), // este tap se ejecuta la primera vez que se trigerea el evento
        skip(1), // Usando el skip hago que el evento no emita la primera vez por lo que va a emitir a partir de la segunda
        tap(() => console.log('despues de skip')), // pero este solo se ejecuta la segunda vez debido al skip
    )

counter$.pipe(
    takeUntil(obsClick$) // Apenas el evento obsClick$ se dispare mi observable va a completar 
).subscribe(
    console.log
)

