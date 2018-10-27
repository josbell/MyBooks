import { Subject, Observable } from 'rxjs';

export function asObservable(subject: Subject<any>): Observable<any> {
  return new Observable(fn => subject.subscribe(fn));
}
