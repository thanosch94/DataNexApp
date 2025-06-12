import { BrandDto } from "../../../dto/brand.dto";
import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction } from "../../shared/actions.factory";


export const GetAllBrands = addGetAction<BrandDto>("[Brands] Get All ");

export const InsertBrand = addInsertAction<BrandDto>("[Brands] Insert Dto")

export const UpdateBrand = addUpdateAction<BrandDto>("[Brands] Update Dto")

export const DeleteBrand = addDeleteAction<BrandDto>("[Brands] Delete By Id")



