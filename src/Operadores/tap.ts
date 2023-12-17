import {map, range, tap} from "rxjs";

const numeros$ = range(1,5);

numeros$
    .pipe(
        // El tap no debe retornar nada y si retorna algo es ignorado
        tap(next => console.log(next, 'antes') ),
        map( next => next * 10),
        //lo poderoso del tap es que se le puede pasar un observer con un complete que solo sera disparado cuando el
        // observable complete
        tap( {complete: ()=>console.log('Completado')})
    )
    .subscribe(next => console.log(next, 'next'))