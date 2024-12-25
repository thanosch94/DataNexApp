import { createAction, props } from "@ngrx/store";
import { BrandDto } from "../../../dto/brand.dto";
import { Guid } from "guid-typescript";

//Get All
export const GetAllBrands = createAction('[Brands List] GetAll')

export const GetAllBrandsSuccess = createAction('[Brands List] GetAll Success', props<{data:BrandDto[]}>())

export const GetAllBrandsFailure = createAction('[Brands List] GetAll Failure', props<{error:string}>())


//InsertDto
export const InsertBrandDto = createAction('[Brands List] InsertDto', props<{dto:BrandDto}>())

export const InsertBrandDtoSuccess = createAction('[Brands List] InsertDto Success', props<{dto:BrandDto}>())

export const InsertBrandDtoFailure = createAction('[Brands List] InsertDto Failure', props<{error:string}>())


//UpdateDto
export const UpdateBrandDto = createAction('[Brands List] UpdateDto', props<{dto:BrandDto}>())

export const UpdateBrandDtoSuccess = createAction('[Brands List] UpdateDto Success', props<{dto:BrandDto}>())

export const UpdateBrandDtoFailure = createAction('[Brands List] UpdateDto Failure', props<{error:string}>())

//DeleteById

export const DeleteBrandById = createAction('[Brands List] DeleteById', props<{id:Guid}>())

export const DeleteBrandByIdSuccess = createAction('[Brands List] DeleteById Success', props<{dto:BrandDto}>())

export const DeleteBrandByIdFailure = createAction('[Brands List] DeleteById Failure ', props<{error:string}>())

