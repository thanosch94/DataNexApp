import { StatusDto } from './../../../dto/status.dto';
import { createReducer, on } from '@ngrx/store';
import { DeleteStatusByIdFailure, DeleteStatusByIdSuccess, GetAllStatuses, GetAllStatusesFailure, GetAllStatusesSuccess, InsertStatusDtoFailure, InsertStatusDtoSuccess, UpdateStatusDtoFailure, UpdateStatusDtoSuccess } from './statuses.actions';

export interface StatusesState {
  data: StatusDto[];
  error: any;
}

export const initialStatusesState: StatusesState = {
  data: [],
  error: null,
};

export const statusesReducer = createReducer(
  initialStatusesState,

  //Get All
  on(GetAllStatuses, (state) => ({ ...state })),
  on(GetAllStatusesSuccess, (state, { data }) => ({
    ...state,
    data,
    error: null,
  })),
  on(GetAllStatusesFailure, (state, {error})=>({
    ...state,
    error
  })),

  //InsertDto
  on(InsertStatusDtoSuccess, (state, {dto:status})=>({
    ...state,
    data:[...state.data, status],
    error:null
  })),
  on(InsertStatusDtoFailure, (state, {error})=>({
    ...state,
    error
  }) ),

  //UpdateDto
  on(UpdateStatusDtoSuccess, (state, {dto:status})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==status.Id?status:x)],
    error:null
  })),
  on(UpdateStatusDtoFailure, (state, {error})=>({
    ...state,
    error
  }) ),

  //DeleteById
  on(DeleteStatusByIdSuccess, (state, {dto:status})=>({
      ...state,
      data:[...(state.data.filter(x=>x.Id!==status.Id))],
      error:null
    })),
    on(DeleteStatusByIdFailure, (state, {error})=>({
      ...state,
      error
    }))
);
