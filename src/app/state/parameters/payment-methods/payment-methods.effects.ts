import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { createDeleteByIdEffect, createGetAllEffect, createInsertUpdateEffect } from '../../shared/effects.factory';
import { Guid } from 'guid-typescript';
import { PaymentMethodDto } from '../../../dto/payment-method.dto';
import { DeletePaymentMethod, GetAllPaymentMethods, InsertPaymentMethod, UpdatePaymentMethod } from './payment-methods.actions';
import { PaymentMethodsService } from '../../../services/parameters/payment-methods.service';

type EffectType = PaymentMethodDto;

@Injectable()
export class PaymentMethodsEffects {

  constructor(
    private service: PaymentMethodsService,
    private actions$: Actions
  ) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllPaymentMethods,
    () => this.service.GetAll()
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertPaymentMethod,
    (dto: EffectType) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdatePaymentMethod,
    (dto: EffectType) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeletePaymentMethod,
    (id: Guid) => this.service.DeleteById(id)
  );
}
