import { ProductDto } from "../../dto/product.dto";
import { addDeleteAction, addGetAction, addGetByIdAction, addUpdateAction } from "../shared/actions.factory";

export const GetAllProducts = addGetAction<ProductDto>("[Product Edit] Get All ");

export const GetProductById = addGetByIdAction<ProductDto>('[Product Edit] GetById')

export const InsertProduct = addUpdateAction<ProductDto>('[Product Edit] InsertDto')

export const UpdateProduct = addUpdateAction<ProductDto>('[Product Edit] UpdateDto')

export const DeleteProduct = addDeleteAction<ProductDto>('[Product Edit] DeleteById')
