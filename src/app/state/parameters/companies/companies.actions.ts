import { createAction, props } from "@ngrx/store";
import { CompanyDto } from "../../../dto/company.dto";
import { Guid } from "guid-typescript";

export const GetAllCompanies = createAction('[Companies List] GetAll')
export const GetAllCompaniesSuccess = createAction('[Companies List] GetAll Success', props<{data:CompanyDto[]}>())
export const GetAllCompaniesFailure = createAction('[Companies List] GetAll Failure', props<{error:any}>())

export const GetCompaniesLookup = createAction('[Companies List] GetLookup')
export const GetCompaniesLookupSuccess = createAction('[Companies List] GetLookup Success', props<{data:CompanyDto[]}>())
export const GetCompaniesLookupFailure = createAction('[Companies List] GetLookup Failure', props<{error:any}>())

export const InsertCompanyDto = createAction('[Companies List], InsertDto', props<{dto:CompanyDto}>())
export const InsertCompanyDtoSuccess = createAction('[Companies List], InsertDto Success', props<{dto:CompanyDto}>())
export const InsertCompanyDtoFailure = createAction('[Companies List], InsertDto Failure', props<{error:any}>())

export const UpdateCompanyDto = createAction('[Companies List], UpdateDto', props<{dto:CompanyDto}>())
export const UpdateCompanyDtoSuccess = createAction('[Companies List], UpdateDto Success', props<{dto:CompanyDto}>())
export const UpdateCompanyDtoFailure = createAction('[Companies List], UpdateDto Failure', props<{error:any}>())

export const DeleteCompanyById = createAction('[Companies List], DeleteCompanyById', props<{id:Guid}>())
export const DeleteCompanyByIdSuccess = createAction('[Companies List], DeleteCompanyById Success', props<{dto:CompanyDto}>())
export const DeleteCompanyByIdFailure = createAction('[Companies List], DeleteCompanyById Failure', props<{error:any}>())

