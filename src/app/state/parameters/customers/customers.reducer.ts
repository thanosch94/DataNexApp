import { createReducer, on } from "@ngrx/store";
import { DeleteCustomer, GetAllCustomers, GetCustomerById, InsertCustomer, UpdateCustomer } from "./customers.actions";
import { CustomerDto } from "../../../dto/customer.dto";

export interface CustomersState {
  data: CustomerDto[];
  error: any;
}

export const initialCustomersState: CustomersState = {
  data: [],
  error: null,
};

export const customersReducer = createReducer(
  initialCustomersState,

  //GeAll
  on(GetAllCustomers.action, (state) => ({ ...state })),
  on(GetAllCustomers.actionSuccess, (state, { data }) => ({ ...state, data, error:null })),
  on(GetAllCustomers.actionFailure, (state, { error }) => ({ ...state, error })),

  //GetById
  on(GetCustomerById.actionSuccess, (state, {dto:customer})=>({
    ...state,
    data:[...(state.data.map(x=>x.Id==customer.Id?customer:x ))],
    error:null
  })),
  on(DeleteCustomer.actionFailure, (state, {error})=>({
    ...state,
    error
  })),

  //InsertDto
  on(InsertCustomer.actionSuccess, (state,{dto:customer})=>({
    ...state,
    data:[...state.data, customer],
    error:null
  })),
  on(InsertCustomer.actionFailure, (state, {error})=>({
    ...state,
    error
  })),

  //UpdateDto
  on(UpdateCustomer.actionSuccess, (state,{dto:customer})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==customer.Id?customer:x)],
    error:null
  })),
  on(UpdateCustomer.actionFailure, (state, {error})=>({
    ...state,
    error
  })),

  //DeleteById
  on(DeleteCustomer.actionSuccess, (state, {dto:customer})=>({
    ...state,
    data:[...(state.data.filter(x=>x.Id!==customer.Id))],
    error:null
  })),
  on(DeleteCustomer.actionFailure, (state, {error})=>({
    ...state,
    error
  }))
);
