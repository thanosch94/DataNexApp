import {
  DeleteDocumentAdditionalCharge,
  GetDocumentAdditionalChargesByDocumentId,
  InsertDocumentAdditionalCharge,
  UpdateDocumentAdditionalCharge,
} from './document-additional-charges.actions';
import { Injectable } from '@angular/core';
import { DocumentAdditionalChargeDto } from '../../dto/document-additional-charge.dto';
import { DocumentAdditionalChargesService } from '../../services/document-additional-charges.service';
import { Actions } from '@ngrx/effects';
import {
  createDeleteByIdEffect,
  createGetAllEffect,
  createGetByEntityIdEffect,
  createInsertUpdateEffect,
} from '../shared/effects.factory';
import { GetAllAdditionalCharges } from '../parameters/additional-charges/additional-charges.actions';
import { Guid } from 'guid-typescript';

type EffectType = DocumentAdditionalChargeDto;
@Injectable()
export class DocumentAdditionalChargesEffects {
  constructor(
    private service: DocumentAdditionalChargesService,
    private actions$: Actions
  ) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllAdditionalCharges,
    () => this.service.GetAll()
  );

  getByDocumentId$ = createGetByEntityIdEffect<EffectType>(
    this.actions$,
    GetDocumentAdditionalChargesByDocumentId,
    (id: Guid) => this.service.GetByDocumentId(id)
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertDocumentAdditionalCharge,
    (dto: EffectType) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdateDocumentAdditionalCharge,
    (dto: EffectType) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeleteDocumentAdditionalCharge,
    (id: Guid) => this.service.DeleteById(id)
  );
}
