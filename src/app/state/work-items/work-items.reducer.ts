import { createReducer, on } from "@ngrx/store";
import { WorkItemDto } from "../../dto/work-item.dto";
import { WorkItemCategoryEnum } from "../../enums/work-item-category.enum";
import { GetAllWorkItems, GetAllWorkItemsSuccess, GetAllWorkItemsFailure, GetAllWorkItemsByWorkItemCategory, GetAllWorkItemsByWorkItemCategorySuccess, GetAllWorkItemsByWorkItemCategoryFailure, InsertWorkItemDtoSuccess, InsertWorkItemDtoFailure, UpdateWorkItemDtoSuccess, UpdateWorkItemDtoFailure, DeleteWorkItemByIdSuccess, DeleteWorkItemByIdFailure, GetWorkItemById, GetWorkItemByIdSuccess, GetWorkItemByIdFailure, ClearSelectedWorkItem } from "./work-items.actions";

export interface WorkItemState {
  tasks: WorkItemDto[];
  selectedWorkItem?:WorkItemDto;
  error: any;
}

export const initialWorkItemState: WorkItemState = {
  tasks: [],
  selectedWorkItem:new WorkItemDto(),
  error: null,
};

export const workItemsReducer = createReducer(
  initialWorkItemState,

  //Get All
  on(GetAllWorkItems, (state) => ({ ...state })),
  on(GetAllWorkItemsSuccess, (state, { data }) => ({
    ...state,
    tasks: data,
    error: null,
  })),
  on(GetAllWorkItemsFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Get by Id
on(GetWorkItemById, (state) => ({ ...state })),

on(GetWorkItemByIdSuccess, (state, { dto }) => ({
  ...state,
  selectedWorkItem: dto,
  error: null,
})),

on(GetWorkItemByIdFailure, (state, { error }) => ({
  ...state,
  error,
})),

//Clears the selectedWorkItem from the state
on(ClearSelectedWorkItem, (state) => ({
  ...state,
  selectedWorkItem: undefined,
})),


  //Get All By WorkItem Category
  on(GetAllWorkItemsByWorkItemCategory, (state) => ({ ...state })),
  on(
    GetAllWorkItemsByWorkItemCategorySuccess,
    (state, { data, workItemCategory: workItem }) => {
      if (workItem == WorkItemCategoryEnum.Task) {
        return {
          ...state,
          tasks: data,
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
  on(GetAllWorkItemsByWorkItemCategoryFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //InsertDto
  on(InsertWorkItemDtoSuccess, (state, { dto: workItem }) => {
    if (workItem?.WorkItemCategory == WorkItemCategoryEnum.Task) {
      return {
        ...state,
        tasks: [...state.tasks, workItem],
        error: null,
      };
    } else {
      return {
        ...state,
        error: null,
      };
    }
  }),
  on(InsertWorkItemDtoFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //UpdateDto
  on(UpdateWorkItemDtoSuccess, (state, { dto: workItem }) => {
    if (workItem?.WorkItemCategory == WorkItemCategoryEnum.Task) {
      return {
        ...state,
        tasks: [
          ...state.tasks.map((x) =>
            x.Id == workItem.Id ? workItem : x
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

  on(UpdateWorkItemDtoFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //DeleteById
  on(DeleteWorkItemByIdSuccess, (state, { dto: workItem }) => {
    debugger
    if (workItem?.WorkItemCategory == WorkItemCategoryEnum.Task) {
      return {
        ...state,
        tasks: [
          ...state.tasks.filter((x) => x.Id != workItem.Id),
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

  on(DeleteWorkItemByIdFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
