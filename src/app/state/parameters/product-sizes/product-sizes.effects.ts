import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { createDeleteByIdEffect, createGetAllEffect, createInsertUpdateEffect } from '../../shared/effects.factory';
import { Guid } from 'guid-typescript';
import { ProductSizeDto } from '../../../dto/product-size.dto';
import { DeleteProductSize, GetAllProductSizes, InsertProductSize, UpdateProductSize } from './product-sizes.actions';
import { ProductSizesService } from '../../../services/parameters/product-sizes.service';

type EffectType = ProductSizeDto;

@Injectable()
export class ProductSizesEffects {

  constructor(
    private service: ProductSizesService,
    private actions$: Actions
  ) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllProductSizes,
    () => this.service.GetAll()
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertProductSize,
    (dto: EffectType) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdateProductSize,
    (dto: EffectType) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeleteProductSize,
    (id: Guid) => this.service.DeleteById(id)
  );
}
