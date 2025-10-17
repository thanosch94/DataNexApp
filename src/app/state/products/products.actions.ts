import { ProductDto } from "../../dto/product.dto";
import { addDeleteAction, addGetAction, addGetByIdAction, addGetByStringIdAction, addUpdateAction } from "../shared/actions.factory";

export const GetAllProducts = addGetAction<ProductDto>("[Product Edit] Get All ");

export const GetProductsLookup = addGetAction<ProductDto>("[Product Edit] Get Lookup ");

export const GetProductById = addGetByIdAction<ProductDto>('[Product Edit] Get By Id')

export const GetProductBySku = addGetByStringIdAction<ProductDto>('[Product Edit] Get By Sku')

export const InsertProduct = addUpdateAction<ProductDto>('[Product Edit] Insert Dto')

export const UpdateProduct = addUpdateAction<ProductDto>('[Product Edit] Update Dto')

export const DeleteProduct = addDeleteAction<ProductDto>('[Product Edit] Delete By Id')
