import { createFeatureSelector, createSelector } from "@ngrx/store"
import { CustomersState } from "./customers.reducer"
import { Guid } from "guid-typescript"

export const selectCustomersState = createFeatureSelector<CustomersState>('customers')

export const selectAllCustomers = createSelector(
  selectCustomersState,
  state=>state.data
)

export const selectCustomerById = (id: Guid) => createSelector(
  selectCustomersState,
  (state: CustomersState) => state.data.find(x => x.Id === id)
);
