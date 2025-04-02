import { createAction, props } from "@ngrx/store";
import { StatusDto } from "../../../dto/status.dto";
import { Guid } from "guid-typescript";
import { StatusTypeEnum } from "../../../enums/status-type.enum";

export const GetAllStatuses = createAction('[Statuses List] GetAll')
export const GetAllStatusesSuccess = createAction('[Statuses List] GetAll Success', props<{data:StatusDto[]}>())
export const GetAllStatusesFailure = createAction('[Statuses List] GetAll Failure', props<{error:any}>())

export const GetAllStatusesByStatusType = createAction('[Statuses List] GetAllByStatusType', props<{statusType:StatusTypeEnum}>())
export const GetAllStatusesByStatusTypeSuccess = createAction('[Statuses List] GetAllByStatusType Success', props<{data:StatusDto[], statusType:StatusTypeEnum}>())
export const GetAllStatusesByStatusTypeFailure = createAction('[Statuses List] GetAllByStatusType Failure', props<{error:any}>())


export const InsertStatusDto = createAction('[Statuses List] InsertDto', props<{dto:StatusDto}>())
export const InsertStatusDtoSuccess = createAction('[Statuses List] InsertDto Success', props<{dto:StatusDto}>())
export const InsertStatusDtoFailure = createAction('[Statuses List] InsertDto Failure', props<{error:any}>())

export const UpdateStatusDto = createAction('[Statuses List] UpdateDto', props<{dto:StatusDto}>())
export const UpdateStatusDtoSuccess = createAction('[Statuses List] UpdateDto Success', props<{dto:StatusDto}>())
export const UpdateStatusDtoFailure = createAction('[Statuses List] UpdateDto Failure', props<{error:any}>())

export const DeleteStatusById = createAction('[Statuses List] Delete Status By Id', props<{id:Guid}>())
export const DeleteStatusByIdSuccess = createAction('[Statuses List] Delete Status By Id Success', props<{dto:StatusDto}>())
export const DeleteStatusByIdFailure = createAction('[Statuses List] Delete Status By Id Failure', props<{error:any}>())

