import { PaymentMethodDto } from '../../../dto/payment-method.dto';
import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction } from '../../shared/actions.factory';

export const GetAllPaymentMethods = addGetAction<PaymentMethodDto>('[Payment Methods] Get All ');

export const InsertPaymentMethod = addInsertAction<PaymentMethodDto>('[Payment Methods] Insert Dto')

export const UpdatePaymentMethod = addUpdateAction<PaymentMethodDto>('[Payment Methods] Update Dto')

export const DeletePaymentMethod = addDeleteAction<PaymentMethodDto>('[Payment Methods] Delete By Id')
