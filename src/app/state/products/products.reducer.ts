import { createReducer, on } from '@ngrx/store';
import { ProductDto } from '../../dto/product.dto';
import {
  DeleteProduct,
  GetAllProducts,
  GetProductById,
  InsertProduct,
  UpdateProduct,
} from './products.actions';

export interface ProductsState {
  data: ProductDto[];
  selectedProducts: ProductDto[];
  error: string | null;
}

export const initialProductsState: ProductsState = {
  data: [],
  selectedProducts: [],
  error: null,
};

export const productsReducer = createReducer(
  initialProductsState,
  //GetAll
  on(GetAllProducts.action, (state) => ({ ...state })),
  on(GetAllProducts.actionSuccess, (state, { data }) => ({
    ...state,
    data,
  })),
  on(GetAllProducts.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  //GetById
  on(GetProductById.action, (state) => ({ ...state })),
  on(GetProductById.actionSuccess, (state, { dto }) => {
    const productExists = state.selectedProducts.some((p) => p.Id === dto.Id);
    return {
      ...state,
      data: [...state.data], // Add product to the array
      selectedProducts: productExists
        ? state.selectedProducts // Don't add if it already exists
        : [...state.selectedProducts, dto], // Add product if it doesn't exist
    };
  }),
  on(GetProductById.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //UpdateDto
  on(UpdateProduct.actionSuccess, (state, { dto }) => ({
    ...state,
    data: state.data.map((p: ProductDto) => (p.Id == dto.Id ? dto : p)),
    selectedProducts: state.selectedProducts.map((p: ProductDto) =>
      p.Id == dto.Id ? dto : p
    ),
  })),
  on(UpdateProduct.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //InsertDto
  on(InsertProduct.actionSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data, dto],
    selectedProducts: [...state.selectedProducts, dto],
  })),
  on(InsertProduct.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //DeleteById
  on(DeleteProduct.actionSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data.filter((x) => x.Id != dto.Id)],
    error: null,
  })),
  on(DeleteProduct.actionFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
