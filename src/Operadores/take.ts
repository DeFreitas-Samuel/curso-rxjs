import { Observable, of, take } from "rxjs";


const numero$: Observable<number> = of(1, 2, 3, 4, 5);

numero$
    .pipe(
        take(3) // Con take solo va a tomar 3 valores a pesar de que el observable emita 5
    )
    .subscribe(
        console.log
    )