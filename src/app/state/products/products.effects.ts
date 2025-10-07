import { Injectable } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Actions } from '@ngrx/effects';
import { createDeleteByIdEffect, createGetAllEffect, createGetByIdEffect, createInsertUpdateEffect } from '../shared/effects.factory';
import { ProductDto } from '../../dto/product.dto';
import { DeleteProduct, GetAllProducts, GetProductById, InsertProduct, UpdateProduct } from './products.actions';
import { Guid } from 'guid-typescript';

type EffectType = ProductDto;
@Injectable()
export class ProductEffects {

  constructor(
    private service: ProductsService,
    private actions$: Actions
  ) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllProducts,
    () => this.service.GetAll()
  );

  getById$ = createGetByIdEffect<EffectType>(
    this.actions$,
    GetProductById,
    (id: Guid) => this.service.GetById(id)
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertProduct,
    (dto: ProductDto) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdateProduct,
    (dto: ProductDto) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeleteProduct,
    (id: Guid) => this.service.DeleteById(id)
  );

}
