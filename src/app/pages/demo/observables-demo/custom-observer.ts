import {Observer} from 'rxjs';

export class CustomObserver implements Observer<number> {
    next (value: number)  {
      console.log('custom observer next',value);
    }
    error (err: any) {
      console.log('custom observer error',err);
    };
    complete () {
      console.log('custom observer complete');
    };
}
