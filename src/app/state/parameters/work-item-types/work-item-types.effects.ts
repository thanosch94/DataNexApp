import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of } from 'rxjs';
import {
  GetAllWorkItemTypesSuccess,
  GetAllWorkItemTypesFailure,
  GetAllWorkItemTypesByWorkItemCategory,
  GetAllWorkItemTypesByWorkItemCategorySuccess,
  GetAllWorkItemTypesByWorkItemCategoryFailure,
  InsertWorkItemTypeDto,
  InsertWorkItemTypeDtoSuccess,
  InsertWorkItemTypeDtoFailure,
  UpdateWorkItemTypeDto,
  UpdateWorkItemTypeDtoSuccess,
  UpdateWorkItemTypeDtoFailure,
  DeleteWorkItemTypeById,
  DeleteWorkItemTypeByIdSuccess,
  DeleteWorkItemTypeByIdFailure,
  GetAllWorkItemTypes,
} from './work-item-types.actions';
import { WorkItemTypesService } from '../../../services/parameters/work-item-types.service';

@Injectable()
export class workItemTypesEffects {
  constructor(
    private workItemTypesService: WorkItemTypesService,
    private actions$: Actions
  ) {}

  loadworkItemTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllWorkItemTypes),
      mergeMap(() =>
        this.workItemTypesService.GetAll().pipe(
          map((workItemTypes: any) =>
            GetAllWorkItemTypesSuccess({ data: workItemTypes })
          ),
          catchError((error: any) => {
            return of(GetAllWorkItemTypesFailure({ error }));
          })
        )
      )
    )
  );
  loadworkItemTypesByWorkItemCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllWorkItemTypesByWorkItemCategory),
      mergeMap((action) =>
        this.workItemTypesService
          .GetAllWorkItemTypesByWorkItemCategory(action.workItemCategory)
          .pipe(
            map((workItemTypes: any) =>
              GetAllWorkItemTypesByWorkItemCategorySuccess({
                data: workItemTypes,
                workItemCategory: action.workItemCategory,
              })
            ),
            catchError((error: any) => {
              return of(
                GetAllWorkItemTypesByWorkItemCategoryFailure({ error })
              );
            })
          )
      )
    )
  );

  insertWorkItemType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertWorkItemTypeDto),
      mergeMap((action) =>
        this.workItemTypesService.InsertDto(action.dto).pipe(
          map((workItemType: any) =>
            InsertWorkItemTypeDtoSuccess({ dto: workItemType })
          ),
          catchError((error: any) => {
            return of(InsertWorkItemTypeDtoFailure({ error }));
          })
        )
      )
    )
  );

  updateWorkItemType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateWorkItemTypeDto),
      mergeMap((action) =>
        this.workItemTypesService.UpdateDto(action.dto).pipe(
          map((workItemType: any) =>
            UpdateWorkItemTypeDtoSuccess({ dto: workItemType })
          ),
          catchError((error: any) => {
            return of(UpdateWorkItemTypeDtoFailure({ error }));
          })
        )
      )
    )
  );

  deleteById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteWorkItemTypeById),
      mergeMap((action: any) =>
        this.workItemTypesService.DeleteById(action.id).pipe(
          map((workItemType: any) =>
            DeleteWorkItemTypeByIdSuccess({ dto: workItemType })
          ),
          catchError((error: any) => {
            return of(DeleteWorkItemTypeByIdFailure({ error }));
          })
        )
      )
    )
  );
}
