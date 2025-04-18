import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkItemCategoryEnum } from '../../../enums/work-item-category.enum';
import { WorkItemTypesState } from './work-item-types.reducer';

export const selectWorkItemTypeState =
  createFeatureSelector<WorkItemTypesState>('workItemTypes');

export const selectAllWorkItemTypes = createSelector(
  selectWorkItemTypeState,
  (state) => state.taskWorkItemTypes
);

export const selectAllWorkItemTypesByWorkItemCategory = (
  workItemType: WorkItemCategoryEnum
) => {
  if (workItemType == WorkItemCategoryEnum.Task) {
    return createSelector(
      selectWorkItemTypeState,
      (state) => state.taskWorkItemTypes
    );
  } else {
    return createSelector(selectWorkItemTypeState, (state) => []);
  }
};

