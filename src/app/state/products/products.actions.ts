import { createAction, props } from "@ngrx/store";
import { Guid } from "guid-typescript";
import { ProductDto } from "../../dto/product.dto";

//Get All Products
export const getAllProducts = createAction('[Products List] GetAll')

export const loadProductsSuccess = createAction(
  '[Products List] Load Products Success',
  props<{ products: ProductDto[] }>()
);
export const loadProductsFailure = createAction(
  '[Products List] Load Products Failure',
  props<{ error: string }>()
);

//Get Product By Id
export const loadProductById = createAction('[Product Edit] GetById', props<{id:Guid}>())

export const loadProductByIdSuccess = createAction(
  '[Product Edit] Load Product By Id Success',
  props<{ product: ProductDto }>()
);
export const loadProductByIdFailure = createAction(
  '[Product Edit] Load Product By Id Failure',
  props<{ error: string }>()
);

//Update Product
export const updateProduct = createAction('[Product Edit] UpdateDto', props<{dto:ProductDto}>())

export const updateProductSuccess = createAction(
  '[Product Edit] Update Product Success',
  props<{ product: ProductDto }>()
);
export const updateProductFailure = createAction(
  '[Product Edit] Update Product Failure',
  props<{ error: string }>()
);

//Insert Product
export const insertProduct = createAction('[Product Edit] InsertDto', props<{dto:ProductDto}>())

export const insertProductSuccess = createAction(
  '[Product Edit] Insert Product Success',
  props<{ product: ProductDto }>()
);
export const insertProductFailure = createAction(
  '[Product Edit] Insert Product Failure',
  props<{ error: string }>()
);
