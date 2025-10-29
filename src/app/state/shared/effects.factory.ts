import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';

export function createGetAllEffect<T>(
  actions$: Actions,
  entityAction: any,
  serviceCall: () => Observable<T[]>
) {
  return createEffect(() =>
    actions$.pipe(
      ofType(entityAction.action),
      mergeMap(() =>
        serviceCall().pipe(
          map((data: T[]) => entityAction.actionSuccess({ data: data })),
          catchError((error) => {
            return of(entityAction.actionFailure({ error }));
          })
        )
      )
    )
  );
}

export function createLookupEffect<T>(
  actions$: Actions,
  entityAction: any,
  serviceCall: () => Observable<T[]>
) {
  return createEffect(() =>
    actions$.pipe(
      ofType(entityAction.action),
      mergeMap(() =>
        serviceCall().pipe(
          map((data: T[]) => entityAction.actionSuccess({ data: data })),
          catchError((error) => {
            return of(entityAction.actionFailure({ error }));
          })
        )
      )
    )
  );
}

export function createGetByEntityIdEffect<T>(
  actions$: Actions,
  entityAction: any,
  serviceCall: (param: any) => Observable<T[]>
) {
  debugger
  return createEffect(() =>
    actions$.pipe(
      ofType(entityAction.action),
      mergeMap((action: any) =>
        serviceCall(action.id).pipe(
          map((data: T[]) => entityAction.actionSuccess({ data: data })),
          catchError((error) => {
            return of(entityAction.actionFailure({ error }));
          })
        )
      )
    )
  );
}

export function createGetByIdEffect<T>(
  actions$: Actions,
  entityAction: any,
  serviceCall: (param: any) => Observable<T>
) {
  return createEffect(() =>
    actions$.pipe(
      ofType(entityAction.action),
      mergeMap((action: any) =>
        serviceCall(action.id).pipe(
          map((data: T) => entityAction.actionSuccess({ dto: data })),
          catchError((error) => {
            return of(entityAction.actionFailure({ error }));
          })
        )
      )
    )
  );
}

export function createInsertUpdateEffect<T>(
  actions$: Actions,
  entityAction: any,
  serviceCall: (param: any) => Observable<T>
) {
  return createEffect(() =>
    actions$.pipe(
      ofType(entityAction.action),
      mergeMap((action: any) =>
        serviceCall(action.dto).pipe(
          map((data: T) => entityAction.actionSuccess({ dto: data })),
          catchError((error) => {
            return of(entityAction.actionFailure({ error }));
          })
        )
      )
    )
  );
}

export function createDeleteByIdEffect<T>(
  actions$: Actions,
  entityAction: any,
  serviceCall: (param: any) => Observable<T>
) {
  return createEffect(() =>
    actions$.pipe(
      ofType(entityAction.action),
      mergeMap((action: any) =>
        serviceCall(action.id).pipe(
          map((data: T) => entityAction.actionSuccess({ dto: data })),
          catchError((error) => {
            return of(entityAction.actionFailure({ error }));
          })
        )
      )
    )
  );
}
