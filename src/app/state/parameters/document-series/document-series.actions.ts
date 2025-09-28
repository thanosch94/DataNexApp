import { DocumentSeriesDto } from "../../../dto/configuration/document-series.dto";
import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction, addGetByIdAction, addGetByEntityIdAction } from "../../shared/actions.factory";

export const GetAllDocumentSeries = addGetAction<DocumentSeriesDto>("[Document Series] Get All ");

export const GetDocumentSeriesByDocumentTypeId = addGetByEntityIdAction<DocumentSeriesDto>("[Document Series] Get By Document Type Id ");

export const GetDocumentSeriesLookup = addGetAction<DocumentSeriesDto>("[Document Series] Get Lookup ");

export const GetDocumentSeriesById = addGetByIdAction<DocumentSeriesDto>("[Document Series] Get By Id ");

export const InsertDocumentSeries = addInsertAction<DocumentSeriesDto>("[Document Series] Insert Dto")

export const UpdateDocumentSeries = addUpdateAction<DocumentSeriesDto>("[Document Series] Update Dto")

export const DeleteDocumentSeries = addDeleteAction<DocumentSeriesDto>("[Document Series] Delete By Id")
