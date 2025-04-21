import { DestroyRef, Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { ActionCreator } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateHelperService {

  constructor(private actions$:Actions ) { }

  setActionResult<T>(type: ActionCreator, destroyRef:Subject<void>):Observable<T>{
    return this.actions$.pipe(
      ofType(type),
      takeUntil(destroyRef),
      map(action => action as T)
    );
  }
}
