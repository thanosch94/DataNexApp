import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StatusesState } from './statuses.reducer';
import { StatusTypeEnum } from '../../../enums/status-type.enum';

export const selectStatusState =
  createFeatureSelector<StatusesState>('statuses');

export const selectAllStatuses = createSelector(
  selectStatusState,
  (state) => state.documentStatuses
);

export const selectAllStatusesByStatusType = (statusType: StatusTypeEnum) =>
{
 if(statusType==StatusTypeEnum.Document){
    return createSelector(selectStatusState,
      (state) => state.documentStatuses
    );
  }else if(statusType==StatusTypeEnum.Project){
    return createSelector(selectStatusState,
      (state) => state.projectStatuses
    );
  }else if(statusType==StatusTypeEnum.Task){
    return createSelector(selectStatusState,
      (state) => state.taskStatuses
    );
  }else{
    return createSelector(selectStatusState,
      (state) => []
    );
  }}
