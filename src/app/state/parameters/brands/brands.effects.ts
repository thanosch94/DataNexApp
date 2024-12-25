import { error } from 'console';
import { Injectable } from '@angular/core';
import { BrandsService } from '../../../services/parameters/brands.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
import { BrandDto } from '../../../dto/brand.dto';

@Injectable()
export class BrandsEffects {
  constructor(
    private brandsService: BrandsService,
    private actions$: Actions,
    private store: Store
  ) {}

  loadBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllBrands),
      mergeMap(() =>
        this.brandsService.GetAll().pipe(
          map((brands: any) => GetAllBrandsSuccess({ data: brands })),
          catchError((error: any) => {
            debugger;
            return of(GetAllBrandsFailure({ error: error }));
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
