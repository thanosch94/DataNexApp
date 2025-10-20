import { createReducer, on } from "@ngrx/store";
import { GeneralOptionsDto } from "../../../dto/configuration/general-options.dto";
import { DeleteGeneralOptions, GetAllGeneralOptions, InsertGeneralOptions, UpdateGeneralOptions } from "./general-options.actions";

export interface GeneralOptionsState {
  data: GeneralOptionsDto[];
  error: any;
}

export const initialGeneralOptionsState: GeneralOptionsState = {
  data: [],
  error: null,
};

export const generalOptionsReducer = createReducer(
  initialGeneralOptionsState,

  //GetAll
  on(GetAllGeneralOptions.action, (state) => ({ ...state })),
  on(GetAllGeneralOptions.actionSuccess, (state, { data }) => ({ ...state, data, error:null })),
  on(GetAllGeneralOptions.actionFailure, (state, { error }) => ({ ...state, error })),

//InsertDto
  on(InsertGeneralOptions.actionSuccess, (state,{dto})=>({
    ...state,
    data:[...state.data, dto],
    error:null
  })),
  on(InsertGeneralOptions.actionFailure, (state, {error})=>({
    ...state,
    error
  })),

  //UpdateDto
  on(UpdateGeneralOptions.actionSuccess, (state,{dto})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==dto.Id?dto:x)],
    error:null
  })),
  on(UpdateGeneralOptions.actionFailure, (state, {error})=>({
    ...state,
    error
  })),

  //DeleteById
  on(DeleteGeneralOptions.actionSuccess, (state, {dto})=>({
    ...state,
    data:[...(state.data.filter(x=>x.Id!==dto.Id))],
    error:null
  })),
  on(DeleteGeneralOptions.actionFailure, (state, {error})=>({
    ...state,
    error
  }))
)
