import { Observable, type Observer } from "rxjs";

const observer: Observer<any> = {
  next: (next) => {
    console.log("Next", next);
  },
  error: (error) => {
    console.log("Error", error);
  },
  complete: () => {
    console.log("Completed");
  },
};

const obs$ = new Observable((subscriber) => {
  subscriber.next("Hola");
  subscriber.next("Mundo");

  subscriber.next("Hola Mundo");

  subscriber.complete();

  subscriber.next("Hey");
});

obs$.subscribe({ next: console.log });

obs$.subscribe(observer);
