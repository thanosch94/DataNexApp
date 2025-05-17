import { AppPermissionDto } from '../../dto/configuration/app-permission.dto';
import { AppEntityEnum } from '../../enums/app-entity.enum';

export const taskListComponentId: any = '610be778-2354-4d1c-b4e3-f0e7724f2643';

const TaskListPermissions = {
  CanSave_Toolbar: 'CanSave_Toolbar',
  CanDelete_Toolbar: 'CanDelete_Toolbar'
} as const;

export const TaskListPermissionsList: Array<AppPermissionDto> = Object.entries(
  TaskListPermissions
).map(([key]) => {
  if (key.includes('Toolbar')) {
    return { Key: key, AppEntity: AppEntityEnum.Toolbar, Screen:'Task List' };
  } else if (key.includes('Field')) {
    return { Key: key, AppEntity: AppEntityEnum.ComponentField, Screen:'Task List' };
  } else if (key.includes('APICall')) {
    return { Key: key, AppEntity: AppEntityEnum.APICall, Screen:'Task List' };
  } else {
    return { Key: key, AppEntity: AppEntityEnum.Other, Screen:'Task List' };
  }
});
