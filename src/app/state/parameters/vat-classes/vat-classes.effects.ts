import { VatClassesService } from './../../../services/parameters/vat-classes.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DeleteVatClassById,
  DeleteVatClassByIdFailure,
  DeleteVatClassByIdSuccess,
  GetAllVatClasses,
  GetAllVatClassesFailure,
  GetAllVatClassesSuccess,
  GetVatClassById,
  GetVatClassByIdFailure,
  GetVatClassByIdSuccess,
  InsertVatClassDto,
  InsertVatClassDtoFailure,
  InsertVatClassDtoSuccess,
  UpdateVatClassDto,
  UpdateVatClassDtoFailure,
  UpdateVatClassDtoSuccess,
} from './vat-classes.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class VatClassesEffects {
  constructor(
    private vatClassesService: VatClassesService,
    private actions$: Actions
  ) {}

  loadVatClasses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllVatClasses),
      mergeMap(() =>
        this.vatClassesService.GetAll().pipe(
          map((vatClasses: any) =>
            GetAllVatClassesSuccess({ data: vatClasses })
          ),
          catchError((error) => {
            return of(GetAllVatClassesFailure({ error }));
          })
        )
      )
    )
  );

  loadVatClassById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetVatClassById),
      mergeMap((action:any) =>
        this.vatClassesService.GetById(action.id).pipe(
          map((vatClass: any) =>
            GetVatClassByIdSuccess({ data: vatClass })
          ),
          catchError((error) => {
            return of(GetVatClassByIdFailure({ error }));
          })
        )
      )
    )
  );

  insertVatClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertVatClassDto),
      mergeMap((action: any) =>
        this.vatClassesService.InsertDto(action.dto).pipe(
          map((insertedVatClass: any) =>
            InsertVatClassDtoSuccess({ dto: insertedVatClass })
          ),
          catchError((error) => {
            return of(InsertVatClassDtoFailure({ error }));
          })
        )
      )
    )
  );

  updateVatClassDto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateVatClassDto),
      mergeMap((action: any) =>
        this.vatClassesService.UpdateDto(action.dto).pipe(
          map((updatedVatClass: any) =>
            UpdateVatClassDtoSuccess({ dto: updatedVatClass })
          ),
          catchError((error) => {
            return of(UpdateVatClassDtoFailure({ error }));
          })
        )
      )
    )
  );

  deleteVatClassById$ = createEffect(()=>
  this.actions$.pipe(
    ofType(DeleteVatClassById),
    mergeMap((action:any)=>
    this.vatClassesService.DeleteById(action.id).pipe(
      map((deletedVatClass:any)=>DeleteVatClassByIdSuccess({dto:deletedVatClass})),
      catchError((error)=>{
        return of(DeleteVatClassByIdFailure({error}))
      })
    ))
  ))
}
