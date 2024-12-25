import { createReducer, on } from '@ngrx/store';
import { ProductDto } from '../../dto/product.dto';
import {
  getAllProducts,
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

export interface ProductsState {
  products: ProductDto[];
  selectedProducts: ProductDto[];
  error: string | null;
}

export const initialProductsState: ProductsState = {
  products: [],
  selectedProducts: [],
  error: null,
};

export const productsReducer = createReducer(
  initialProductsState,
  //GetAll
  on(getAllProducts, (state) => ({ ...state })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  //GetById
  on(loadProductById, (state) => ({ ...state })),
  on(loadProductByIdSuccess, (state, { product }) => {
    const productExists = state.selectedProducts.some(
      (p) => p.Id === product.Id
    );
    return {
      ...state,
      products: [...state.products], // Add product to the array
      selectedProducts: productExists
        ? state.selectedProducts // Don't add if it already exists
        : [...state.selectedProducts, product], // Add product if it doesn't exist
    };
  }),
  on(loadProductByIdFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //UpdateDto
  on(updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map((p: ProductDto) =>
      p.Id == product.Id ? product : p
    ),
    selectedProducts: state.selectedProducts.map((p: ProductDto) =>
      p.Id == product.Id ? product : p
    ),
  })),
  on(updateProductFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //InsertDto
  on(insertProductSuccess,(state,{product})=>({
    ...state,
    products:[...state.products, product],
    selectedProducts:[...state.selectedProducts, product]
  })),
  on(insertProductFailure, (state, {error})=>({
    ...state,
    error
  }))
);
