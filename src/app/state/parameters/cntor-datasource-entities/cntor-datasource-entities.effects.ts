import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DeleteCntorDatasourceEntity, GetAllCntorDatasourceEntities, GetCntorDatasourceEntitiesByDataSourceId, InsertCntorDatasourceEntity, UpdateCntorDatasourceEntity } from './cntor-datasource-entities.actions';
import { CntorDatasourceEntitiesService } from '../../../services/parameters/cntor-datasource-entities.service';

@Injectable()
export class CntorDatasourceEntitiesEffects {
  constructor(
    private cntorDatasourceEntitiesService: CntorDatasourceEntitiesService,
    private actions$: Actions,
  ) {}

  getCntorDatasourceEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllCntorDatasourceEntities.action),
      mergeMap(() =>
        this.cntorDatasourceEntitiesService.GetAll().pipe(
          map((cntorDatasourceEntities: any) => GetAllCntorDatasourceEntities.actionSuccess({ data: cntorDatasourceEntities })),
          catchError((error: any) => {
            return of(GetAllCntorDatasourceEntities.actionFailure({ error }));
          })
        )
      )
    )
  );


  getCntorDatasourcesByDatasourceId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCntorDatasourceEntitiesByDataSourceId.action),
      mergeMap((action: any) =>
        this.cntorDatasourceEntitiesService
          .GetCntorDatasourceEntitiesByDataSourceId(action.id)
          .pipe(
            map((cntorDatasourceEntities: any) =>
              GetCntorDatasourceEntitiesByDataSourceId.actionSuccess({ data: cntorDatasourceEntities })),
            catchError((error:any)=>{
              return of(GetCntorDatasourceEntitiesByDataSourceId.actionFailure({error}))
            })
          )
      )
    )
  );

  insertCntorDatasourceEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertCntorDatasourceEntity.action),
      mergeMap((action: any) =>
        this.cntorDatasourceEntitiesService.InsertDto(action.dto).pipe(
          map((insertedCntorDatasourceEntity: any) =>
            InsertCntorDatasourceEntity.actionSuccess({ dto: insertedCntorDatasourceEntity })
          ),
          catchError((error: any) => {
            return of(InsertCntorDatasourceEntity.actionFailure({ error }));
          })
        )
      )
    )
  );

  updateCntorDatasourceEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateCntorDatasourceEntity.action),
      mergeMap((action: any) =>
        this.cntorDatasourceEntitiesService.UpdateDto(action.dto).pipe(
          map((updatedCntorDatasourceEntity: any) =>
            UpdateCntorDatasourceEntity.actionSuccess({ dto: updatedCntorDatasourceEntity })
          ),
          catchError((error: any) => {
            return of(UpdateCntorDatasourceEntity.actionFailure({ error }));
          })
        )
      )
    )
  );

  deleteById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteCntorDatasourceEntity.action),
      mergeMap((action: any) =>
        this.cntorDatasourceEntitiesService
          .DeleteById(action.id)
          .pipe(
            map((brand: any) =>
              DeleteCntorDatasourceEntity.actionSuccess({ dto:brand })),
            catchError((error:any)=>{
              return of(DeleteCntorDatasourceEntity.actionFailure({error}))
            })
          )
      )
    )
  );
}
