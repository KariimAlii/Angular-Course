import {Component, OnInit} from '@angular/core';
import {catchError, firstValueFrom, from, fromEvent, map, Observable, of} from 'rxjs';
import {CustomObserver} from './custom-observer';

@Component({
  selector: 'app-observables-demo',
  standalone: false,
  templateUrl: './observables-demo.component.html',
  styleUrl: './observables-demo.component.css'
})
export class ObservablesDemoComponent implements OnInit {
  data: number = 0;
  users$: Observable<{id: number, name: string, age: number}[]>;
  userNames$: Observable<string[]>;
  constructor() {

    // https://www.learnrxjs.io/learn-rxjs/operators/creation/of
    const numbers$ = of([1,2,3,4,5]);  // takes a single value as array

    numbers$.subscribe((data) => {
      console.log('Subscriber1:', data)
    })

    const numbers2$ = from([1,2,3,4,5]);  // one by one ( every single element )

    numbers2$.subscribe((data) => {
      console.log('Subscriber2:', data)
      this.data = data;
    })

    // convert js data to stream
    const users = [
      {id: 1, name: "Ahmed", age:25},
      {id: 2, name: "Maged", age:26},
      {id: 3, name: "Sherif", age:27},
    ]

    this.users$ = of(users);

    this.userNames$ = this.users$
      .pipe(
        map(users => users.map(user => user.name))
      )

    this.users$.subscribe((data) => {
      console.log('users',data)
    })

    // convert stream to promise
    // users$.toPromise().then(data => console.log('users from promise',data))
    firstValueFrom(this.users$).then(data => console.log('users from promise',data))

    // convert promise to stream
    // const messagePromise = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('Promise resolved!');
    //   }, 1000)
    // })

    const messagePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Promise rejected!');
      }, 1000)
    })

    const message$ = from(messagePromise)
    // when yuo work with promise you always need to use from because of pushes the promise itself
    // message$.subscribe((data) => {
    //   console.log('message',data)
    // })
    message$.subscribe({
      next: (data) => {
        console.log('message',data)
      },
      error: (err) => {
        console.log('err',err)
      },
      complete: () => {console.log('completed!!')} // is called when stream is completed and closed , by default streams are not completed automatically
    })

    // convert dom events to streams
    const bodyClick$ = fromEvent(document, 'click')
    bodyClick$.subscribe((data) => {
      console.log('bodyClick',data)
    })

    // Custom Observable

    const users2$ = new Observable(observer => {
      // observer.next(users) ==> if you want to simulate of(users)
      // users.forEach(user => observer.next(user)); ==> if you want to simulate from(users)
      observer.next(1)
      observer.next(2)
      observer.next(3)
      observer.next(4)
      observer.complete()
      observer.next(5)  // ❌❌
    })

    users2$.subscribe({
      next: (data) => {
        console.log('users2',data)
      },
      complete: () => console.log('users2 completed'),
    })

    // Custom Observer (Not Recommended)
    numbers2$.subscribe(new CustomObserver())
  }

  ngOnInit(): void {
    // convert promise to observable
    this.getPosts().subscribe({
      next: (data) => {console.log('posts',data)}
    })
  }
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  getPosts(): Observable<any[]> {
    // Convert fetch Promise to Observable using 'from'
    return from(
      fetch(this.apiUrl).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    ).pipe(
      catchError(error => {
        console.error('Error fetching posts:', error);
        throw error;
      })
    );
  }

  getPostById(id: number): Observable<any> {
    return from(
      fetch(`${this.apiUrl}/${id}`).then(response => {
        if (!response.ok) {
          throw new Error(`Post with id ${id} not found`);
        }
        return response.json();
      })
    ).pipe(
      catchError(error => {
        console.error(`Error fetching post ${id}:`, error);
        throw error;
      })
    );
  }
}
