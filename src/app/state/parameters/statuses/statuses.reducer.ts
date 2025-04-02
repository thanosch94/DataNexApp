import { StatusDto } from './../../../dto/status.dto';
import { createReducer, on } from '@ngrx/store';
import {
  DeleteStatusByIdFailure,
  DeleteStatusByIdSuccess,
  GetAllStatuses,
  GetAllStatusesByStatusType,
  GetAllStatusesByStatusTypeFailure,
  GetAllStatusesByStatusTypeSuccess,
  GetAllStatusesFailure,
  GetAllStatusesSuccess,
  InsertStatusDtoFailure,
  InsertStatusDtoSuccess,
  UpdateStatusDtoFailure,
  UpdateStatusDtoSuccess,
} from './statuses.actions';
import { StatusTypeEnum } from '../../../enums/status-type.enum';

export interface StatusesState {
  documentStatuses: StatusDto[];
  projectStatuses: StatusDto[];
  taskStatuses: StatusDto[];
  error: any;
}

export const initialStatusesState: StatusesState = {
  documentStatuses: [],
  projectStatuses: [],
  taskStatuses: [],
  error: null,
};

export const statusesReducer = createReducer(
  initialStatusesState,

  //Get All
  on(GetAllStatuses, (state) => ({ ...state })),
  on(GetAllStatusesSuccess, (state, { data }) => ({
    ...state,
    documentStatuses: data,
    error: null,
  })),
  on(GetAllStatusesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //Get All By StatusType
  on(GetAllStatusesByStatusType, (state) => ({ ...state })),
  on(GetAllStatusesByStatusTypeSuccess, (state, { data }) => {
    if (data[0]?.StatusType == StatusTypeEnum.Document) {
      return {
        ...state,
        documentStatuses: [...data],
        error: null,
      };
    } else if (data[0]?.StatusType == StatusTypeEnum.Project) {
      return {
        ...state,
        projectStatuses: [...data],
        error: null,
      };
    } else if (data[0]?.StatusType == StatusTypeEnum.Task) {
      return {
        ...state,
        taskStatuses: [...data],
        error: null,
      };
    } else {
      return {
        ...state,
        error: null,
      };
    }
  }),
  on(GetAllStatusesByStatusTypeFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //InsertDto
  on(InsertStatusDtoSuccess, (state, { dto: status }) => {
    if (status?.StatusType == StatusTypeEnum.Document) {
      return {
        ...state,
        documentStatuses: [...state.documentStatuses, status],
        error: null,
      };
    } else if (status?.StatusType == StatusTypeEnum.Project) {
      return {
        ...state,
        projectStatuses: [...state.projectStatuses, status],
        error: null,
      };
    } else if (status?.StatusType == StatusTypeEnum.Task) {
      return {
        ...state,
        taskStatuses: [...state.taskStatuses, status],
        error: null,
      };
    } else {
      return {
        ...state,
        error: null,
      };
    }
  }),
  on(InsertStatusDtoFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //UpdateDto
  on(UpdateStatusDtoSuccess, (state, { dto: status }) => {
    if (status?.StatusType == StatusTypeEnum.Document) {
      return {
        ...state,
        documentStatuses: [ ...state.documentStatuses.map((x) => (x.Id == status.Id ? status : x))],
        error: null,
      };
    } else if (status?.StatusType == StatusTypeEnum.Project) {
      return {
        ...state,
        projectStatuses: [ ...state.projectStatuses.map((x) => (x.Id == status.Id ? status : x))],
        error: null,
      };
    } else if (status?.StatusType == StatusTypeEnum.Task) {
      return {
        ...state,
        taskStatuses: [...state.taskStatuses.map((x) => (x.Id == status.Id ? status : x))],
        error: null,
      };
    } else {
      return {
        ...state,
        error: null,
      };
    }
  }),


  on(UpdateStatusDtoFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //DeleteById
  on(DeleteStatusByIdSuccess, (state, { dto: status }) =>  {
    if (status?.StatusType == StatusTypeEnum.Document) {
      return {
        ...state,
        documentStatuses: [ ...state.documentStatuses.filter((x) => x.Id !== status.Id)],
        error: null,
      };
    } else if (status?.StatusType == StatusTypeEnum.Project) {
      return {
        ...state,
        projectStatuses: [...state.projectStatuses.filter((x) => x.Id !== status.Id)],
        error: null,
      };
    } else if (status?.StatusType == StatusTypeEnum.Task) {
      return {
        ...state,
        taskStatuses: [...state.taskStatuses.map((x) => (x.Id == status.Id ? status : x))],
        error: null,
      };
    } else {
      return {
        ...state,
        error: null,
      };
    }
  }),

  on(DeleteStatusByIdFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
