import { createReducer, on } from '@ngrx/store';
import {
  DeleteWorkItemTypeByIdFailure,
  DeleteWorkItemTypeByIdSuccess,
  GetAllWorkItemTypes,
  GetAllWorkItemTypesByWorkItemCategory as GetAllWorkItemTypesByWorkItemCategory,
  GetAllWorkItemTypesByWorkItemCategoryFailure as GetAllWorkItemTypesByWorkItemCategoryFailure,
  GetAllWorkItemTypesByWorkItemCategorySuccess as GetAllWorkItemTypesByWorkItemCategorySuccess,
  GetAllWorkItemTypesFailure,
  GetAllWorkItemTypesSuccess,
  InsertWorkItemTypeDtoFailure,
  InsertWorkItemTypeDtoSuccess,
  UpdateWorkItemTypeDtoFailure,
  UpdateWorkItemTypeDtoSuccess,
} from './work-item-types.actions';
import { WorkItemTypeDto } from '../../../dto/work-item-type.dto';
import { WorkItemCategoryEnum } from '../../../enums/work-item-category.enum';

export interface WorkItemTypesState {
  taskWorkItemTypes: WorkItemTypeDto[];
  error: any;
}

export const initialWorkItemTypesState: WorkItemTypesState = {
  taskWorkItemTypes: [],
  error: null,
};

export const workItemTypesReducer = createReducer(
  initialWorkItemTypesState,

  //Get All
  on(GetAllWorkItemTypes, (state) => ({ ...state })),
  on(GetAllWorkItemTypesSuccess, (state, { data }) => ({
    ...state,
    taskWorkItemTypes: data,
    error: null,
  })),
  on(GetAllWorkItemTypesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //Get All By WorkItemTypeType
  on(GetAllWorkItemTypesByWorkItemCategory, (state) => ({ ...state })),
  on(
    GetAllWorkItemTypesByWorkItemCategorySuccess,
    (state, { data, workItemCategory: workItemType }) => {
      if (workItemType == WorkItemCategoryEnum.Task) {
        return {
          ...state,
          taskWorkItemTypes: data,
          error: null,
        };
      } else {
        return {
          ...state,
          error: null,
        };
      }
    }
  ),
  on(GetAllWorkItemTypesByWorkItemCategoryFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //InsertDto
  on(InsertWorkItemTypeDtoSuccess, (state, { dto: workItemType }) => {
    if (workItemType?.Category == WorkItemCategoryEnum.Task) {
      return {
        ...state,
        taskWorkItemTypes: [...state.taskWorkItemTypes, workItemType],
        error: null,
      };
    } else {
      return {
        ...state,
        error: null,
      };
    }
  }),
  on(InsertWorkItemTypeDtoFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //UpdateDto
  on(UpdateWorkItemTypeDtoSuccess, (state, { dto: workItemType }) => {
    if (workItemType?.Category == WorkItemCategoryEnum.Task) {
      return {
        ...state,
        taskWorkItemTypes: [
          ...state.taskWorkItemTypes.map((x) =>
            x.Id == workItemType.Id ? workItemType : x
          ),
        ],
        error: null,
      };
    } else {
      return {
        ...state,
        error: null,
      };
    }
  }),

  on(UpdateWorkItemTypeDtoFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //DeleteById
  on(DeleteWorkItemTypeByIdSuccess, (state, { dto: workItemType }) => {
    if (workItemType?.Category == WorkItemCategoryEnum.Task) {
      return {
        ...state,
        taskWorkItemTypes: [
          ...state.taskWorkItemTypes.filter((x) => x.Id !== workItemType.Id),
        ],
        error: null,
      };
    } else {
      return {
        ...state,
        error: null,
      };
    }
  }),

  on(DeleteWorkItemTypeByIdFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
