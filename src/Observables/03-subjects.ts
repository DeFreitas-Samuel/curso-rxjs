import { Observable, Observer, Subject } from "rxjs";

const observer: Observer<any> = {
  next: (next) => {
    console.log("next:", next);
  },
  error: (error) => {
    console.warn("Error: ", error);
  },
  complete: () => {
    console.log("Completed");
  },
};

const observable$: Observable<number> = new Observable<number>((subs) => {
  const interval = setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100);
    subs.next(randomNumber);
  }, 1000);

  return () => {
    clearInterval(interval);
    console.log("Destroyed");
  };
});

// This will print different random numbers even though they are subsccribed to the same observable
observable$.subscribe((next) => {
  console.log("Sub1: ", next);
});
observable$.subscribe((next) => {
  console.log("Sub2: ", next);
});

// If I want to receive the same value in all my subscriptions then what I have to do is use a subject
// I can do this by passing a subject to a subscription as it was an observer
// Then when I subscribe to the subject I will receive the values of my observable but synchronized in
// all of my subscriptions
const subject$: Subject<number> = new Subject<number>();
const subscription = observable$.subscribe(subject$);

subject$.subscribe((next) => {
  console.log("Sub3: ", next);
});
subject$.subscribe((next) => {
  console.log("Sub4: ", next);
});

setTimeout(() => {
  // A subject is an active source of data so this way I can actively emit values for it, in contrast of an Observable that cannot emit
  // data that it wasn't told to produce at the moment of its creation
  subject$.next(10);

  // Due to me subscribing the subject to observable I have to unsubscribe my subject and then unsubscribe the other
  // subscripition that my subject could have
  subscription.unsubscribe();
  subject$.unsubscribe();
}, 5000);
