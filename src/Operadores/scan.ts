import { from } from 'rxjs';
import { map, reduce, scan } from 'rxjs/operators';



//Scan es basicamente un reduce que emite los valores intermedios de cada acumulacion
//En contraste con reduce que solo emite el valor final

const numbers = [1, 2, 3, 4, 5]

const totalAccumulator = (acc: number, curr: number) => acc + curr


// Reduce
from(numbers).pipe(
    reduce(totalAccumulator)
)
    .subscribe(
        console.log
    )

// Scan
from(numbers).pipe(
    scan(totalAccumulator)
)
    .subscribe(
        console.log
    )

// De acuerdo con el curso este operador se puede usar para implementar el patron
// Redux para manejar el estado de mi aplicacion

interface User {
    id?: string;
    authenticated?: boolean;
    token?: string | null;
    age?: number
}

const users: User[] = [
    { id: 'test', authenticated: false, token: null },
    { id: 'test', authenticated: true, token: 'sdfsdf' },
    { id: 'test', authenticated: true, token: 'sdfsdffff' },
]

const state$ = from(users).pipe(
    scan<User, User>((acc, curr) => {
        return { ...acc, ...curr }
    }, { age: 33 })
)

const id$ = state$.pipe(
    map((user) => {
        return user.id
    }

    )
)

id$.subscribe(console.log)

// Cada vez que cambia el estado de mi aplicacion se emite el objeto del estado