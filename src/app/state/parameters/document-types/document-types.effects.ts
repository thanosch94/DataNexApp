import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DocumentTypesService } from '../../../services/parameters/document-types.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  DeleteDocumentTypeById,
  DeleteDocumentTypeByIdFailure,
  DeleteDocumentTypeByIdSuccess,
  GetAllDocumentTypes,
  GetAllDocumentTypesFailure,
  GetAllDocumentTypesSuccess,
  GetDocumentTypeById,
  GetDocumentTypeByIdFailure,
  GetDocumentTypeByIdSuccess,
  GetDocumentTypesLookup,
  GetDocumentTypesLookupFailure,
  GetDocumentTypesLookupSuccess,
  InsertDocumentTypeDto,
  InsertDocumentTypeDtoFailure,
  InsertDocumentTypeDtoSuccess,
  UpdateDocumentTypeDto,
  UpdateDocumentTypeDtoSuccess,
} from './document-types.actions';

@Injectable()
export class DocumentTypesEffects {
  constructor(
    private documentTypesService: DocumentTypesService,
    private actions$: Actions
  ) {}

  loadDocumentTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllDocumentTypes),
      mergeMap(() =>
        this.documentTypesService.GetAll().pipe(
          map((documentTypes: any) =>
            GetAllDocumentTypesSuccess({ data: documentTypes })
          ),
          catchError((error) => {
            return of(GetAllDocumentTypesFailure({ error }));
          })
        )
      )
    )
  );

  loadDocumentTypesLookup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDocumentTypesLookup),
      mergeMap(() =>
        this.documentTypesService.GetLookup().pipe(
          map((documentTypes: any) =>
            GetDocumentTypesLookupSuccess({ data: documentTypes })
          ),
          catchError((error) => {
            return of(GetDocumentTypesLookupFailure({ error }));
          })
        )
      )
    )
  );

  loadDocumentTypeById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDocumentTypeById),
      mergeMap((action:any) =>
        this.documentTypesService.GetById(action.id).pipe(
          map((documentType: any) =>
            GetDocumentTypeByIdSuccess({ dto: documentType })
          ),
          catchError((error) => {
            return of(GetDocumentTypeByIdFailure({ error }));
          })
        )
      )
    )
  );

  insertDocumentType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertDocumentTypeDto),
      mergeMap((action: any) =>
        this.documentTypesService.InsertDto(action.dto).pipe(
          map((insertedDocumentType: any) =>
            InsertDocumentTypeDtoSuccess({ dto: insertedDocumentType })
          ),
          catchError((error) => {
            return of(InsertDocumentTypeDtoFailure({ error }));
          })
        )
      )
    )
  );

  updateDocumentType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateDocumentTypeDto),
      mergeMap((action: any) =>
        this.documentTypesService.UpdateDto(action.dto).pipe(
          map((updatedDocumentType: any) =>
            UpdateDocumentTypeDtoSuccess({ dto: updatedDocumentType })
          ),
          catchError((error) => {
            return of(DeleteDocumentTypeByIdFailure({ error }));
          })
        )
      )
    )
  );

  deleteDocumentType$ = createEffect(()=>
    this.actions$.pipe(
      ofType(DeleteDocumentTypeById),
      mergeMap((action:any)=>
      this.documentTypesService.DeleteById(action.id).pipe(
        map((deletedDocumentType:any)=>DeleteDocumentTypeByIdSuccess({dto:deletedDocumentType})),
        catchError((error)=>{
          return of(DeleteDocumentTypeByIdFailure({error}))
        })
      ))
    ))
}
