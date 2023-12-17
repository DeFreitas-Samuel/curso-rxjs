import {filter, fromEvent, map, Observable, of} from "rxjs";

const personajes = [
  {
    nombre: 'batman',
    tipo: 'heroe'
  },
  {
    nombre: 'robin',
    tipo: 'heroe'
  },
  {
    nombre: 'joker',
    tipo: 'villano'
  },
  {
    nombre: 'luthor',
    tipo: 'villano'
  },
]

const personajes$ = of(...personajes)

personajes$.pipe(
    filter( next => {
      return next.tipo === 'villano'
    })
).subscribe(console.log)

// Si imprimo este se mostraran todos los personajes sin importar que aplicara un pipe al observable. Cada observable
// es indendiente sin importarle lo que pase aotros objetos subscritos a este o que se le haya hecho pipe en otro sitio

personajes$.subscribe(console.log)

const keyup$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>( document, 'keyup')

const keyupPiped$: Observable<string> = keyup$.pipe(
    map( event => event.code), // Toma keyboard event y regresa un string
    filter ( keyCode => keyCode === 'Enter')
)
// Este va a imprimir el evento completo cada vez que presione cualquier tecla
keyup$.subscribe(console.log);
// Este va a imprimir solo la palabra enter cuando presione la tecla enter
keyupPiped$.subscribe(console.log);