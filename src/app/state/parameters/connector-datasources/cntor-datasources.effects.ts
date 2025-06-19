import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DeleteCntorDatasource, GetAllCntorDatasources, InsertCntorDatasource, UpdateCntorDatasource } from './cntor-datasources.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CntorDatasourcesService } from '../../../services/parameters/cntor-datasources.service';

@Injectable()
export class CntorDatasourcesEffects {
  constructor(
    private cntorDatasourcesService: CntorDatasourcesService,
    private actions$: Actions,
  ) {}

  loadCntorDatasources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllCntorDatasources.action),
      mergeMap(() =>
        this.cntorDatasourcesService.GetAll().pipe(
          map((cntorDatasources: any) => GetAllCntorDatasources.actionSuccess({ data: cntorDatasources })),
          catchError((error: any) => {
            return of(GetAllCntorDatasources.actionFailure({ error }));
          })
        )
      )
    )
  );

  insertCntorDatasource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertCntorDatasource.action),
      mergeMap((action: any) =>
        this.cntorDatasourcesService.InsertDto(action.dto).pipe(
          map((insertedCntorDatasource: any) =>
            InsertCntorDatasource.actionSuccess({ dto: insertedCntorDatasource })
          ),
          catchError((error: any) => {
            return of(InsertCntorDatasource.actionFailure({ error }));
          })
        )
      )
    )
  );

  updateCntorDatasource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateCntorDatasource.action),
      mergeMap((action: any) =>
        this.cntorDatasourcesService.UpdateDto(action.dto).pipe(
          map((updatedCntorDatasource: any) =>
            UpdateCntorDatasource.actionSuccess({ dto: updatedCntorDatasource })
          ),
          catchError((error: any) => {
            return of(UpdateCntorDatasource.actionFailure({ error }));
          })
        )
      )
    )
  );

  deleteById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteCntorDatasource.action),
      mergeMap((action: any) =>
        this.cntorDatasourcesService
          .DeleteById(action.id)
          .pipe(
            map((cntorDatasource: any) =>
              DeleteCntorDatasource.actionSuccess({ dto:cntorDatasource })),
            catchError((error:any)=>{
              return of(DeleteCntorDatasource.actionFailure({error}))
            })
          )
      )
    )
  );
}
