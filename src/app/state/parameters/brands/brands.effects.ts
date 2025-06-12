import { Injectable } from '@angular/core';
import { BrandsService } from '../../../services/parameters/brands.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DeleteBrand,
  GetAllBrands,
  InsertBrand,
  UpdateBrand,
} from './brands.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class BrandsEffects {
  constructor(
    private brandsService: BrandsService,
    private actions$: Actions,
  ) {}

  loadBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllBrands.action),
      mergeMap(() =>
        this.brandsService.GetAll().pipe(
          map((brands: any) => GetAllBrands.actionSuccess({ data: brands })),
          catchError((error: any) => {
            return of(GetAllBrands.actionFailure({ error }));
          })
        )
      )
    )
  );

  insertBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertBrand.action),
      mergeMap((action: any) =>
        this.brandsService.InsertDto(action.dto).pipe(
          map((insertedBrand: any) =>
            InsertBrand.actionSuccess({ dto: insertedBrand })
          ),
          catchError((error: any) => {
            return of(InsertBrand.actionFailure({ error }));
          })
        )
      )
    )
  );

  updateBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateBrand.action),
      mergeMap((action: any) =>
        this.brandsService.UpdateDto(action.dto).pipe(
          map((updatedBrand: any) =>
            UpdateBrand.actionSuccess({ dto: updatedBrand })
          ),
          catchError((error: any) => {
            return of(UpdateBrand.actionFailure({ error }));
          })
        )
      )
    )
  );

  deleteById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteBrand.action),
      mergeMap((action: any) =>
        this.brandsService
          .DeleteById(action.id)
          .pipe(
            map((brand: any) =>
              DeleteBrand.actionSuccess({ dto:brand })),
            catchError((error:any)=>{
              return of(DeleteBrand.actionFailure({error}))
            })
          )
      )
    )
  );
}
