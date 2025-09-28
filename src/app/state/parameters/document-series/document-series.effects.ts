import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { DocumentSeriesService } from '../../../services/parameters/document-series.service';
import {
  DeleteDocumentSeries,
  GetAllDocumentSeries,
  GetDocumentSeriesByDocumentTypeId,
  GetDocumentSeriesById,
  GetDocumentSeriesLookup,
  InsertDocumentSeries,
  UpdateDocumentSeries,
} from './document-series.actions';
import {
  createGetAllEffect,
  createInsertUpdateEffect,
  createLookupEffect,
  createGetByEntityIdEffect,
  createGetByIdEffect,
  createDeleteByIdEffect,
} from '../../shared/effects.factory';
import { Guid } from 'guid-typescript';
import { DocumentSeriesDto } from '../../../dto/configuration/document-series.dto';

type EffectType = DocumentSeriesDto;
@Injectable()
export class DocumentSeriesEffects {

  constructor(
    private service: DocumentSeriesService,
    private actions$: Actions
  ) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllDocumentSeries,
    () => this.service.GetAll()
  );

  getByDocumentType$ = createGetByEntityIdEffect<EffectType>(
    this.actions$,
    GetDocumentSeriesByDocumentTypeId,
    (id: Guid) => this.service.GetByDocumentTypeId(id)
  );

  getLookup$ = createLookupEffect<EffectType>(
    this.actions$,
    GetDocumentSeriesLookup,
    () => this.service.GetLookup()
  );

  getById$ = createGetByIdEffect<EffectType>(
    this.actions$,
    GetDocumentSeriesById,
    (id: Guid) => this.service.GetById(id)
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertDocumentSeries,
    (dto: DocumentSeriesDto) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdateDocumentSeries,
    (dto: DocumentSeriesDto) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeleteDocumentSeries,
    (id: Guid) => this.service.DeleteById(id)
  );
}
