import { Injectable } from '@angular/core';
import { StatusesService } from '../../../services/parameters/statuses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DeleteStatusById,
  DeleteStatusByIdFailure,
  DeleteStatusByIdSuccess,
  GetAllStatuses,
  GetAllStatusesByStatusType,
  GetAllStatusesByStatusTypeFailure,
  GetAllStatusesByStatusTypeSuccess,
  GetAllStatusesFailure,
  GetAllStatusesSuccess,
  InsertStatusDto,
  InsertStatusDtoFailure,
  InsertStatusDtoSuccess,
  UpdateStatusDto,
  UpdateStatusDtoFailure,
  UpdateStatusDtoSuccess,
} from './statuses.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class StatusesEffects {
  constructor(
    private statusesService: StatusesService,
    private actions$: Actions
  ) {}

  loadStatuses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllStatuses),
      mergeMap(() =>
        this.statusesService.GetAll().pipe(
          map((statuses: any) => GetAllStatusesSuccess({ data: statuses })),
          catchError((error: any) => {
            return of(GetAllStatusesFailure({ error }));
          })
        )
      )
    )
  );
  loadStatusesByStatusType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllStatusesByStatusType),
      mergeMap((action) =>
        this.statusesService.GetAllStatusesByStatusType(action.statusType).pipe(
          map((statuses: any) => GetAllStatusesByStatusTypeSuccess({ data: statuses, statusType:action.statusType })),
          catchError((error: any) => {
            return of(GetAllStatusesByStatusTypeFailure({ error }));
          })
        )
      )
    )
  );

  insertStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertStatusDto),
      mergeMap((action) =>
        this.statusesService.InsertDto(action.dto).pipe(
          map((status: any) => InsertStatusDtoSuccess({ dto: status })),
          catchError((error: any) => {
            return of(InsertStatusDtoFailure({ error }));
          })
        )
      )
    )
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateStatusDto),
      mergeMap((action) =>
        this.statusesService.UpdateDto(action.dto).pipe(
          map((status: any) => UpdateStatusDtoSuccess({ dto: status })),
          catchError((error: any) => {
            return of(UpdateStatusDtoFailure({ error }));
          })
        )
      )
    )
  );

 deleteById$ = createEffect(() =>
     this.actions$.pipe(
       ofType(DeleteStatusById),
       mergeMap((action: any) =>
         this.statusesService
           .DeleteById(action.id)
           .pipe(
             map((status: any) =>
               DeleteStatusByIdSuccess({ dto:status })),
             catchError((error:any)=>{
               return of(DeleteStatusByIdFailure({error}))
             })
           )
       )
     )
   );
}
