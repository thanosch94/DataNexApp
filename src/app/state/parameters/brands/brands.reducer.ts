import { createReducer, on } from '@ngrx/store';
import { BrandDto } from '../../../dto/brand.dto';
import {
  DeleteBrandByIdFailure,
  DeleteBrandByIdSuccess,
  GetAllBrands,
  GetAllBrandsFailure,
  GetAllBrandsSuccess,
  InsertBrandDtoFailure,
  InsertBrandDtoSuccess,
  UpdateBrandDtoFailure,
  UpdateBrandDtoSuccess,
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
  on(GetAllBrands, (state) => ({ ...state })),
  on(GetAllBrandsSuccess, (state, { data }) => ({ ...state, data, error:null })),
  on(GetAllBrandsFailure, (state, { error }) => ({ ...state, error })),

  //InsertDto
  on(InsertBrandDtoSuccess, (state,{dto:brand})=>({
    ...state,
    data:[...state.data, brand],
    error:null
  })),
  on(InsertBrandDtoFailure, (state, {error})=>({
    ...state,
    error
  })),

  //UpdateDto
  on(UpdateBrandDtoSuccess, (state,{dto:brand})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==brand.Id?brand:x)],
    error:null
  })),
  on(UpdateBrandDtoFailure, (state, {error})=>({
    ...state,
    error
  })),

  //DeleteById
  on(DeleteBrandByIdSuccess, (state, {dto:brand})=>({
    ...state,
    data:[...(state.data.filter(x=>x.Id!==brand.Id))],
    error:null
  })),
  on(DeleteBrandByIdFailure, (state, {error})=>({
    ...state,
    error
  }))
);
