import { Injectable } from '@angular/core';
import { BrandsService } from '../../../services/parameters/brands.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DeleteBrandById,
  DeleteBrandByIdFailure,
  DeleteBrandByIdSuccess,
  GetAllBrands,
  GetAllBrandsFailure,
  GetAllBrandsSuccess,
  InsertBrandDto,
  InsertBrandDtoFailure,
  InsertBrandDtoSuccess,
  UpdateBrandDto,
  UpdateBrandDtoFailure,
  UpdateBrandDtoSuccess,
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
      ofType(GetAllBrands),
      mergeMap(() =>
        this.brandsService.GetAll().pipe(
          map((brands: any) => GetAllBrandsSuccess({ data: brands })),
          catchError((error: any) => {
            return of(GetAllBrandsFailure({ error }));
          })
        )
      )
    )
  );

  insertBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertBrandDto),
      mergeMap((action: any) =>
        this.brandsService.InsertDto(action.dto).pipe(
          map((insertedBrand: any) =>
            InsertBrandDtoSuccess({ dto: insertedBrand })
          ),
          catchError((error: any) => {
            return of(InsertBrandDtoFailure({ error }));
          })
        )
      )
    )
  );

  updateBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateBrandDto),
      mergeMap((action: any) =>
        this.brandsService.UpdateDto(action.dto).pipe(
          map((updatedBrand: any) =>
            UpdateBrandDtoSuccess({ dto: updatedBrand })
          ),
          catchError((error: any) => {
            return of(UpdateBrandDtoFailure({ error }));
          })
        )
      )
    )
  );

  deleteById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteBrandById),
      mergeMap((action: any) =>
        this.brandsService
          .DeleteById(action.id)
          .pipe(
            map((brand: any) =>
              DeleteBrandByIdSuccess({ dto:brand })),
            catchError((error:any)=>{
              debugger
              return of(DeleteBrandByIdFailure({error}))
            })
          )
      )
    )
  );
}
