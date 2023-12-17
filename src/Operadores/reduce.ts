import { interval, reduce, take } from "rxjs"
// El operador de rxjs 'reduce' no empieza a emitir valores sino hasta que se completa

//Este es el reducer normal de JS
const arr = [1, 2, 3, 4, 5]

const totalReducer = function (accumulator: number, currentValue: number) {
    return accumulator + currentValue
}

const result = arr.reduce(totalReducer) // result es igual a 15

console.log(result)

interval(1000)
    .pipe(
        take(4), //El take limita las emisiones a solo 4
        reduce(totalReducer, 5) //Le puedo pasar exactamente los mismos argumentos que al reducer de js
    )
    .subscribe(
        {
            next: (next) => console.log(next), // El resultado seria 11. 4 emisiones del interval (0,1,2,3) que se suman (6) 
            //y estas se suman al acumulador que le pase al reduce (6 +5 = 11)
            complete: () => console.log('completed')
        }
    )