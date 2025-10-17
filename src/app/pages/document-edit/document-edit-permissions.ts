import { AppPermissionDto } from '../../dto/configuration/app-permission.dto';
import { AppEntityEnum } from '../../enums/app-entity.enum';

export const documentEditComponentId: any = 'd20b6b98-9546-456d-8531-9302e0a3dcdd';

const DocumentEditPermissions = {
  CanPrint_Toolbar: 'CanPrint_Toolbar',
  CanSave_Toolbar: 'CanSave_Toolbar',
  CanDelete_Toolbar: 'CanDelete_Toolbar',
} as const;

export const DocumentEditPermissionsList: Array<AppPermissionDto> = Object.entries(
  DocumentEditPermissions
).map(([key]) => {
  const base = { MasterEntityDescr: 'Document Edit', MasterEntityId: documentEditComponentId };

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
