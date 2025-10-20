import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { DocumentTypesService } from '../../../services/parameters/document-types.service';
import {
  DeleteDocumentType,
  GetAllDocumentTypes,
  GetDocumentTypeById,
  GetDocumentTypesLookup,
  InsertDocumentType,
  UpdateDocumentType,
} from './document-types.actions';
import { createDeleteByIdEffect, createGetAllEffect, createGetByIdEffect, createInsertUpdateEffect, createLookupEffect } from '../../shared/effects.factory';
import { DocumentTypeDto } from '../../../dto/document-type.dto';
import { Guid } from 'guid-typescript';

type EffectType = DocumentTypeDto;

@Injectable()
export class DocumentTypesEffects {
  constructor(
    private service: DocumentTypesService,
    private actions$: Actions
  ) {}


  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllDocumentTypes,
    () => this.service.GetAll()
  );

  getLookup$ = createLookupEffect<EffectType>(
    this.actions$,
    GetDocumentTypesLookup,
    () => this.service.GetLookup()
  );

  getById$ = createGetByIdEffect<EffectType>(
    this.actions$,
    GetDocumentTypeById,
    (id:Guid) => this.service.GetById(id)
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertDocumentType,
    (dto: EffectType) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdateDocumentType,
    (dto: EffectType) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeleteDocumentType,
    (id: Guid) => this.service.DeleteById(id)
  );

}
