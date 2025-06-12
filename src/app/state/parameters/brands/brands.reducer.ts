import { createReducer, on } from '@ngrx/store';
import { BrandDto } from '../../../dto/brand.dto';
import {
  DeleteBrand,
  GetAllBrands,
  InsertBrand,
  UpdateBrand,
} from './brands.actions';

export interface BrandsState {
  data: BrandDto[];
  error: any;
}

export const initialBrandsState: BrandsState = {
  data: [],
  error: null,
};

export const brandsReducer = createReducer(
  initialBrandsState,

  //GeAll
  on(GetAllBrands.action, (state) => ({ ...state })),
  on(GetAllBrands.actionSuccess, (state, { data }) => ({
    ...state,
    data: data ?? [],
    error: null,
  })),
  on(GetAllBrands.actionFailure, (state, { error }) => ({ ...state, error })),

  //InsertDto
  on(InsertBrand.actionSuccess, (state, { dto: brand }) => ({
    ...state,
    data: [...state.data, brand],
    error: null,
  })),
  on(InsertBrand.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //UpdateDto
  on(UpdateBrand.actionSuccess, (state, { dto: brand }) => ({
    ...state,
    data: [...state.data.map((x) => (x.Id == brand.Id ? brand : x))],
    error: null,
  })),
  on(UpdateBrand.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //DeleteById
  on(DeleteBrand.actionSuccess, (state, { dto: brand }) => ({
    ...state,
    data: [...state.data.filter((x) => x.Id !== brand.Id)],
    error: null,
  })),
  on(DeleteBrand.actionFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
