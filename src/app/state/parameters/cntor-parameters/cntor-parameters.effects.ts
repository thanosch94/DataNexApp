import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { createDeleteByIdEffect, createGetAllEffect, createInsertUpdateEffect } from '../../shared/effects.factory';
import { Guid } from 'guid-typescript';
import { ConnectorParametersDto } from '../../../dto/connector-parameters.dto';
import { CntorParametersService } from '../../../services/parameters/cntor-parameters.service';
import { DeleteCntorParameters, GetAllCntorParameters, InsertCntorParameters, UpdateCntorParameters } from './cntor-parameters.actions';

type EffectType = ConnectorParametersDto;

@Injectable()
export class CntorParametersEffects {

  constructor(
    private service: CntorParametersService,
    private actions$: Actions
  ) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllCntorParameters,
    () => this.service.GetAll()
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertCntorParameters,
    (dto: EffectType) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdateCntorParameters,
    (dto: EffectType) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeleteCntorParameters,
    (id: Guid) => this.service.DeleteById(id)
  );
}
