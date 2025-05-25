import { AppPermissionDto } from '../../dto/configuration/app-permission.dto';
import { AppEntityEnum } from '../../enums/app-entity.enum';

export const taskEditComponentId: any = '840cd7b2-ea32-485d-b81e-253c765251b9';

const TaskEditPermissions = {
  CanSave_Toolbar: 'CanSave_Toolbar',
  CanDelete_Toolbar: 'CanDelete_Toolbar',
  EnableTaskTypeId_Field: 'EnableTaskTypeId_Field',
  EnableStatusId_Field: 'EnableStatusId_Field',
  EnableProjectId_Field: 'EnableProjectId_Field',
  EnableAssigneeId_Field: 'EnableAssigneeId_Field',
  EnableWorkItemPriority_Field: 'EnableWorkItemPriority_Field',
  EnableDueDate_Field: 'EnableDueDate_Field',
} as const;

export const TaskEditPermissionsList: Array<AppPermissionDto> = Object.entries(
  TaskEditPermissions
).map(([key]) => {
  const base = { MasterEntityDescr: 'Task Edit', MasterEntityId: taskEditComponentId };

  if (key.includes('Toolbar')) {
    return { ...base, Key: key, AppEntity: AppEntityEnum.Toolbar };
  } else if (key.includes('Field')) {
    return { ...base, Key: key, AppEntity: AppEntityEnum.ComponentField };
  } else if (key.includes('APICall')) {
    return { ...base, Key: key, AppEntity: AppEntityEnum.APICall };
  } else {
    return { ...base, Key: key, AppEntity: AppEntityEnum.Other };
  }
});
