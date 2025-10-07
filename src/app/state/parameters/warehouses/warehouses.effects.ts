import { Actions } from '@ngrx/effects';
import { WarehouseDto } from '../../../dto/inventory/warehouse.dto';
import {
  createDeleteByIdEffect,
  createGetAllEffect,
  createInsertUpdateEffect,
} from '../../shared/effects.factory';
import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { WarehousesService } from '../../../services/parameters/warehouses.service';
import {
  DeleteWarehouse,
  GetAllWarehouses,
  InsertWarehouse,
  UpdateWarehouse,
} from './warehouses.actions';

type EffectType = WarehouseDto;
@Injectable()
export class WarehousesEffects {
  constructor(private service: WarehousesService, private actions$: Actions) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllWarehouses,
    () => this.service.GetAll()
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertWarehouse,
    (dto: EffectType) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdateWarehouse,
    (dto: EffectType) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeleteWarehouse,
    (id: Guid) => this.service.DeleteById(id)
  );
}
