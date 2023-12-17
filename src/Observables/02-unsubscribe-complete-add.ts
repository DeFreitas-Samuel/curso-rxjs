import { Observable, type Observer } from "rxjs";

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

const intervalos$ = new Observable<number>((subs) => {
  let counter = 0;

  const interval = setInterval(() => {
    counter++;
    console.log(counter);
    subs.next(counter);
  }, 1000);

  setTimeout(() => {
    subs.complete();
  }, 4000);

  // This show that I can return a function inside a subscriber. This function will be executed when the
  // observable is unsubscribed or when it completes whatever happens next

  // Also if the observable completes then if it is unsubscribed this function will NOT run again. It only
  // runs once
  return () => {
    clearInterval(interval);
  };
});

const subscription1 = intervalos$.subscribe(console.log);
const subscription5 = intervalos$.subscribe(console.log);

// When sub1 is unsubscribed it will also unsubscribe sub5, no questions asked
subscription1.add(subscription5);

setTimeout(() => {
  subscription1.unsubscribe();
  // This is to show that each subscription is independent of others subscriptions, so each will start emitting values at a different rate
  // Even though they are subscribed to the same observable
  const subscription2 = intervalos$.subscribe(console.log);
}, 5000);
