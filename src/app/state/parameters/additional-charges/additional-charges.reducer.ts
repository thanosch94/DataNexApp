import { DeleteAdditionalChargeByIdFailure, DeleteAdditionalChargeByIdSuccess, GetAllAdditionalCharges, GetAllAdditionalChargesFailure, GetAllAdditionalChargesSuccess, InsertAdditionalChargeDto, InsertAdditionalChargeDtoFailure, InsertAdditionalChargeDtoSuccess, UpdateAdditionalChargeDto, UpdateAdditionalChargeDtoFailure, UpdateAdditionalChargeDtoSuccess } from './additional-charges.actions';
import { AdditionalChargeDto } from "../../../dto/additional-charge.dto";
import { createReducer, on } from '@ngrx/store';

export interface AdditionalChargesState {
  data:AdditionalChargeDto[],
  error:any
}

export const initialAdditionalChargesState:AdditionalChargesState ={
  data:[],
  error: null
}

export const additionalChargesReducer = createReducer(
  initialAdditionalChargesState,
  on(GetAllAdditionalCharges, (state)=>({...state})),
  on(GetAllAdditionalChargesSuccess, (state, {data})=>({
    ...state,
    data
  })),
  on(GetAllAdditionalChargesFailure, (state, {error})=>({
    ...state,
    error
  })),
  on(InsertAdditionalChargeDtoSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data, dto],
    error:null
  })),
  on(InsertAdditionalChargeDtoFailure, (state, {error})=>({
    ...state,
    error
  })),
  on(UpdateAdditionalChargeDtoSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==dto.Id?dto:x)],
    error:null
  })),
  on(UpdateAdditionalChargeDtoFailure, (state, {error})=>({
    ...state,
    error
  })
  ),
  on(DeleteAdditionalChargeByIdSuccess, (state,{dto})=>({
    ...state,
    data:[...state.data.filter(x=>x.Id!=dto.Id)],
    error:null
  })),
  on(DeleteAdditionalChargeByIdFailure, (state, {error} )=>({
    ...state,
    error
  }))
)
