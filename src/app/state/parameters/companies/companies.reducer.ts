import { createReducer, on } from "@ngrx/store";
import { CompanyDto } from "../../../dto/company.dto";
import { DeleteCompanyByIdFailure, DeleteCompanyByIdSuccess, GetAllCompanies, GetAllCompaniesFailure, GetAllCompaniesSuccess, GetCompaniesLookup, GetCompaniesLookupFailure, GetCompaniesLookupSuccess, InsertCompanyDtoFailure, InsertCompanyDtoSuccess, UpdateCompanyDtoFailure, UpdateCompanyDtoSuccess } from "./companies.actions";

export interface CompaniesState{
  data:CompanyDto[]
  lookup:CompanyDto[]
  error:any
}

export const initialCompaniesState:CompaniesState={
  data:[],
  lookup:[],
  error:null
}

export const companiesReducer = createReducer(
  initialCompaniesState,

  //Get All
  on(GetAllCompanies, (state)=>({...state})),
  on(GetAllCompaniesSuccess, (state, {data})=>({
    ...state,
    data,
    error:null
  })),
  on(GetAllCompaniesFailure, (state, {error})=>({
    ...state,
    error
  })),

  //Get Lookup
  on(GetCompaniesLookup, (state)=>({...state})),
  on(GetCompaniesLookupSuccess, (state, {data})=>({
    ...state,
    lookup:data,
    error:null
  })),
  on(GetCompaniesLookupFailure, (state, {error})=>({
    ...state,
    error
  })),

  //InsertDto
  on(InsertCompanyDtoSuccess, (state, {dto:company})=>({
      ...state,
      data:[...state.data, company],
      error:null
    })),
    on(InsertCompanyDtoFailure, (state, {error})=>({
      ...state,
      error
    }) ),

    //UpdateDto
    on(UpdateCompanyDtoSuccess, (state, {dto:company})=>({
      ...state,
      data:[...state.data.map(x=>x.Id==company.Id?company:x)],
      error:null
    })),
    on(UpdateCompanyDtoFailure, (state, {error})=>({
      ...state,
      error
    }) ),

    //DeleteById
    on(DeleteCompanyByIdSuccess, (state, {dto:company})=>({
        ...state,
        data:[...(state.data.filter(x=>x.Id!==company.Id))],
        error:null
      })),
      on(DeleteCompanyByIdFailure, (state, {error})=>({
        ...state,
        error
      }))

)
