import { Injectable } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, take } from 'rxjs';
import {
  getAllProducts,
  insertProduct,
  insertProductFailure,
  insertProductSuccess,
  loadProductById,
  loadProductByIdFailure,
  loadProductByIdSuccess,
  loadProductsFailure,
  loadProductsSuccess,
  updateProduct,
  updateProductFailure,
  updateProductSuccess,
} from './products.actions';
import { Store } from '@ngrx/store';
import { selectProductById } from './products.selectors';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllProducts),
      mergeMap(() =>
        this.productsService.GetAll().pipe(
          map((products: any) => loadProductsSuccess({ products })),
          catchError((error) => {
            console.error('Error fetching products:', error);
            return of(loadProductsFailure({ error: error.message }));
          })
        )
      )
    )
  );

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductById),
      mergeMap((action) => {
        const productId = action.id; // Get the product ID from the action

        return this.store.select(selectProductById(productId)).pipe(
          take(1),
          mergeMap((product) => {
            if (product) {
              // If the product exists in the store, return the success action
              return of(loadProductByIdSuccess({ product }));
            } else {
              // If the product is not in the store, make the API call
              return this.productsService.GetById(productId).pipe(
                map((product: any) => loadProductByIdSuccess({ product })),
                catchError((error) =>
                  of(loadProductByIdFailure({ error: error.message }))
                )
              );
            }
          })
        );
      })
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      mergeMap((action: any) => {
        return this.productsService.UpdateDto(action.dto).pipe(
          map((updatedProduct: any) =>
            updateProductSuccess({ product: updatedProduct })
          ),
          catchError((error) =>
            of(updateProductFailure({ error: error.message }))
          )
        );
      })
    )
  );

  insertProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(insertProduct),
      mergeMap((action: any) => {
        return this.productsService.InsertDto(action.dto).pipe(
          map((insertedProduct: any) =>
            insertProductSuccess({ product: insertedProduct })
          ),
          catchError((error) =>
            of(insertProductFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
