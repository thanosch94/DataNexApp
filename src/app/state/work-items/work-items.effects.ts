import { Injectable } from "@angular/core";
import { WorkItemsService } from "../../services/work-items.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { DeleteWorkItemById, DeleteWorkItemByIdFailure, DeleteWorkItemByIdSuccess, GetAllWorkItems, GetAllWorkItemsByWorkItemCategory, GetAllWorkItemsByWorkItemCategoryFailure, GetAllWorkItemsByWorkItemCategorySuccess, GetAllWorkItemsFailure, GetAllWorkItemsSuccess, GetWorkItemById, GetWorkItemByIdFailure, GetWorkItemByIdSuccess, InsertWorkItemDto, InsertWorkItemDtoFailure, InsertWorkItemDtoSuccess, UpdateWorkItemDto, UpdateWorkItemDtoFailure, UpdateWorkItemDtoSuccess } from "./work-items.actions";

@Injectable()
export class workItemsEffects {
  constructor(
    private workItemsService: WorkItemsService,
    private actions$: Actions
  ) {}

  getworkItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllWorkItems),
      mergeMap(() =>
        this.workItemsService.GetAll().pipe(
          map((workItems: any) =>
            GetAllWorkItemsSuccess({ data: workItems })
          ),
          catchError((error: any) => {
            return of(GetAllWorkItemsFailure({ error }));
          })
        )
      )
    )
  );

 getWorkItemById$ = createEffect(() =>
     this.actions$.pipe(
       ofType(GetWorkItemById),
       mergeMap((action:any) =>
         this.workItemsService.GetById(action.id).pipe(
           map((workItem: any) =>
            GetWorkItemByIdSuccess({ dto: workItem })
           ),
           catchError((error) => {
             return of(GetWorkItemByIdFailure({ error }));
           })
         )
       )
     )
   );

   getAllWorkItemTypesByWorkItemCategory$ = createEffect(() =>
       this.actions$.pipe(
         ofType(GetAllWorkItemsByWorkItemCategory),
         mergeMap((action) =>
           this.workItemsService
             .GetAllByWorkItemCategory(action.workItemCategory)
             .pipe(
               map((workItemTypes: any) =>
                GetAllWorkItemsByWorkItemCategorySuccess({
                   data: workItemTypes,
                   workItemCategory: action.workItemCategory,
                 })
               ),
               catchError((error: any) => {
                 return of(
                  GetAllWorkItemsByWorkItemCategoryFailure({ error })
                 );
               })
             )
         )
       )
     );

      insertWorkItem$ = createEffect(() =>
         this.actions$.pipe(
           ofType(InsertWorkItemDto),
           mergeMap((action) =>
             this.workItemsService.InsertDto(action.dto).pipe(
               map((workItem: any) =>
                 InsertWorkItemDtoSuccess({ dto: workItem })
               ),
               catchError((error: any) => {
                 return of(InsertWorkItemDtoFailure({ error }));
               })
             )
           )
         )
       );

       updateWorkItem$ = createEffect(() =>
         this.actions$.pipe(
           ofType(UpdateWorkItemDto),
           mergeMap((action) =>
             this.workItemsService.UpdateDto(action.dto).pipe(
               map((workItem: any) =>
                 UpdateWorkItemDtoSuccess({ dto: workItem })
               ),
               catchError((error: any) => {
                 return of(UpdateWorkItemDtoFailure({ error }));
               })
             )
           )
         )
       );

       deleteById$ = createEffect(() =>
         this.actions$.pipe(
           ofType(DeleteWorkItemById),
           mergeMap((action: any) =>
             this.workItemsService.DeleteById(action.id).pipe(
               map((workItem: any) =>
                 DeleteWorkItemByIdSuccess({ dto: workItem })
               ),
               catchError((error: any) => {
                 return of(DeleteWorkItemByIdFailure({ error }));
               })
             )
           )
         )
       );
}
