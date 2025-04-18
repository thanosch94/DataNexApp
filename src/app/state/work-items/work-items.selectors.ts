import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Guid } from "guid-typescript";
import { WorkItemState } from "./work-items.reducer";
import { WorkItemDto } from "../../dto/work-item.dto";

export const selectWorkItemsState = createFeatureSelector<WorkItemState>('workItems');

export const selectAllUsers = createSelector(
  selectWorkItemsState,
  state => state.tasks
);

export const selectTaskById = (id: Guid) => createSelector(
  selectWorkItemsState,
  (state: WorkItemState) => state.selectedWorkItem
);

export const selectAllTaskByUserId = (userId: Guid) => createSelector(
  selectWorkItemsState,
  (state: WorkItemState) => state.tasks.filter((workItem:WorkItemDto) => workItem.AssigneeId == userId)
);


