import { ShippingMethodDto } from '../../../dto/shipping-method.dto';
import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction } from '../../shared/actions.factory';

export const GetAllShippingMethods = addGetAction<ShippingMethodDto>('[Shipping Methods] Get All ');

export const InsertShippingMethod = addInsertAction<ShippingMethodDto>('[Shipping Methods] Insert Dto')

export const UpdateShippingMethod = addUpdateAction<ShippingMethodDto>('[Shipping Methods] Update Dto')

export const DeleteShippingMethod = addDeleteAction<ShippingMethodDto>('[Shipping Methods] Delete By Id')
