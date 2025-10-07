import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.reducer";
import { Guid } from "guid-typescript";

export const selectProductsState = createFeatureSelector<ProductsState>('products');

// Select all products
export const selectAllProducts = createSelector(
  selectProductsState,
  state => state.data
);
// export const selectProductById = (productId: Guid) => createSelector(
//   selectAllProducts,
//   (products) => products.find(product => product.Id === productId) // Adjust to match your product's ID field
// );

export const selectProductById = (id: Guid) => createSelector(
  selectProductsState,
  (state: ProductsState) => state.selectedProducts.find(product => product.Id === id)
);
// // Select a specific product by ID
// export const selectSelectedProduct = createSelector(
//   selectProductsState,
//   state => state.selectedProduct
// );

// // Select loading state
// export const selectLoading = createSelector(
//   selectProductsState,
//   state => state.loading
// );

// Select error state
export const selectError = createSelector(
  selectProductsState,
  state => state.error
);
