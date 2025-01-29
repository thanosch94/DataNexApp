import { createReducer, on } from '@ngrx/store';
import { VatClassDto } from '../../../dto/vat-class.dto';
import {
  DeleteVatClassByIdFailure,
  DeleteVatClassByIdSuccess,
  GetAllVatClasses,
  GetAllVatClassesFailure,
  GetAllVatClassesSuccess,
  GetVatClassById,
  GetVatClassByIdFailure,
  GetVatClassByIdSuccess,
  InsertVatClassDto,
  InsertVatClassDtoFailure,
  InsertVatClassDtoSuccess,
  UpdateVatClassDto,
  UpdateVatClassDtoFailure,
  UpdateVatClassDtoSuccess,
} from './vat-classes.actions';

export interface VatClassesState {
  data: VatClassDto[];
  selected: VatClassDto
  error: any;
}

export const initialVatClassesState: VatClassesState = {
  data: [],
  selected: new VatClassDto(),
  error: null,
};

export const vatClassesReducer = createReducer(
  initialVatClassesState,
  on(GetAllVatClasses, (state) => ({ ...state })),
  on(GetAllVatClassesSuccess, (state, { data }) => ({
    ...state,
    data:data,
    error: null,
  })),
  on(GetAllVatClassesFailure, (state, { error }) => ({ ...state, error })),

  //Get By Id
  on(GetVatClassById, (state) => ({ ...state })),
  on(GetVatClassByIdSuccess, (state, { data }) => ({
    ...state,
    selected:data,
    error: null,
  })),
  on(GetVatClassByIdFailure, (state, { error }) => ({ ...state, error })),

  //InsertDto
  on(InsertVatClassDto, (state)=>({...state})),
  on(InsertVatClassDtoSuccess,(state, {dto:data})=>({
    ...state,
    data:[...state.data, data],
    error:null
  })),
  on(InsertVatClassDtoFailure, (state,{error})=>({
    ...state,
    error
  })),

  //UpdateDto
  on(UpdateVatClassDtoSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==dto.Id?dto:x)],
    error:null
  })),
  on(UpdateVatClassDtoFailure, (state, {error})=> ({
    ...state,
    error
  })),

  //DeleteById
  on(DeleteVatClassByIdSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.filter(x=>x.Id!=dto.Id)],
    error:null
  })),
  on(DeleteVatClassByIdFailure, (state, {error})=>({
    ...state,
    error
  }))
);
