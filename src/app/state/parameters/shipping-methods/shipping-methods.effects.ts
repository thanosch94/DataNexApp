import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { createDeleteByIdEffect, createGetAllEffect, createInsertUpdateEffect } from '../../shared/effects.factory';
import { Guid } from 'guid-typescript';
import { ShippingMethodDto } from '../../../dto/shipping-method.dto';
import { DeleteShippingMethod, GetAllShippingMethods, InsertShippingMethod, UpdateShippingMethod } from './shipping-methods.actions';
import { ShippingMethodsService } from '../../../services/parameters/shipping-methods.service';

type EffectType = ShippingMethodDto;

@Injectable()
export class ShippingMethodsEffects {

  constructor(
    private service: ShippingMethodsService,
    private actions$: Actions
  ) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllShippingMethods,
    () => this.service.GetAll()
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertShippingMethod,
    (dto: EffectType) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdateShippingMethod,
    (dto: EffectType) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeleteShippingMethod,
    (id: Guid) => this.service.DeleteById(id)
  );
}
