import { ProductSizeDto } from '../../../dto/product-size.dto';
import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction } from '../../shared/actions.factory';

export const GetAllProductSizes = addGetAction<ProductSizeDto>('[Product Sizes] Get All ');

export const InsertProductSize = addInsertAction<ProductSizeDto>('[Product Sizes] Insert Dto')

export const UpdateProductSize = addUpdateAction<ProductSizeDto>('[Product Sizes] Update Dto')

export const DeleteProductSize = addDeleteAction<ProductSizeDto>('[Product Sizes] Delete By Id')
