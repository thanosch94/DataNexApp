import { AppPermissionDto } from '../../dto/configuration/app-permission.dto';
import { AppEntityEnum } from '../../enums/app-entity.enum';

export const taskEditComponentId: any = '610be778-2354-4d1c-b4e3-f0e7724f2643';

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
  if (key.includes('Toolbar')) {
    return { Key: key, AppEntity: AppEntityEnum.Toolbar, Screen:'Task Edit'  };
  } else if (key.includes('Field')) {
    return { Key: key, AppEntity: AppEntityEnum.ComponentField, Screen:'Task Edit' };
  } else if (key.includes('APICall')) {
    return { Key: key, AppEntity: AppEntityEnum.APICall, Screen:'Task Edit'  };
  } else {
    return { Key: key, AppEntity: AppEntityEnum.Other, Screen:'Task Edit'  };
  }
});
