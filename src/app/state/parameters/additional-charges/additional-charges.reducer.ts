import { DeleteAdditionalCharge, GetAllAdditionalCharges, InsertAdditionalCharge, UpdateAdditionalCharge } from './additional-charges.actions';
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
  on(GetAllAdditionalCharges.action, (state)=>({...state})),
  on(GetAllAdditionalCharges.actionSuccess, (state, {data})=>({
    ...state,
    data
  })),
  on(GetAllAdditionalCharges.actionFailure, (state, {error})=>({
    ...state,
    error
  })),
  on(InsertAdditionalCharge.actionSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data, dto],
    error:null
  })),
  on(InsertAdditionalCharge.actionFailure, (state, {error})=>({
    ...state,
    error
  })),
  on(UpdateAdditionalCharge.actionSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==dto.Id?dto:x)],
    error:null
  })),
  on(UpdateAdditionalCharge.actionFailure, (state, {error})=>({
    ...state,
    error
  })
  ),
  on(DeleteAdditionalCharge.actionSuccess, (state,{dto})=>({
    ...state,
    data:[...state.data.filter(x=>x.Id!=dto.Id)],
    error:null
  })),
  on(DeleteAdditionalCharge.actionFailure, (state, {error} )=>({
    ...state,
    error
  }))
)
