import { createAction, props } from "@ngrx/store"
import { Guid } from "guid-typescript"
import { WorkItemTypeDto } from "../../../dto/work-item-type.dto"
import { WorkItemCategoryEnum } from "../../../enums/work-item-category.enum"

//Get All
export const GetAllWorkItemTypes = createAction('[Work Item Types List] GetAll')

export const GetAllWorkItemTypesSuccess = createAction('[Work Item Types List] GetAll Success', props<{data:WorkItemTypeDto[]}>())

export const GetAllWorkItemTypesFailure = createAction('[Work Item Types List] GetAll Failure', props<{error:string}>())


//Get By Work Item Type
export const GetAllWorkItemTypesByWorkItemCategory = createAction('[workItemTypes List] GetAllByWorkItemCategoy', props<{workItemCategory:WorkItemCategoryEnum}>())

export const GetAllWorkItemTypesByWorkItemCategorySuccess = createAction('[workItemTypes List] GetAllByWorkItemCategory Success', props<{data:WorkItemTypeDto[], workItemCategory:WorkItemCategoryEnum}>())

export const GetAllWorkItemTypesByWorkItemCategoryFailure = createAction('[workItemTypes List] GetAllByWorkItemCategory Failure', props<{error:any}>())



//InsertDto
export const InsertWorkItemTypeDto = createAction('[Work Item Types List] InsertDto', props<{dto:WorkItemTypeDto}>())

export const InsertWorkItemTypeDtoSuccess = createAction('[Work Item Types List] InsertDto Success', props<{dto:WorkItemTypeDto}>())

export const InsertWorkItemTypeDtoFailure = createAction('[Work Item Types List] InsertDto Failure', props<{error:string}>())


//UpdateDto
export const UpdateWorkItemTypeDto = createAction('[Work Item Types List] UpdateDto', props<{dto:WorkItemTypeDto}>())

export const UpdateWorkItemTypeDtoSuccess = createAction('[Work Item Types List] UpdateDto Success', props<{dto:WorkItemTypeDto}>())

export const UpdateWorkItemTypeDtoFailure = createAction('[Work Item Types List] UpdateDto Failure', props<{error:string}>())

//DeleteById

export const DeleteWorkItemTypeById = createAction('[Work Item Types List] DeleteById', props<{id:Guid}>())

export const DeleteWorkItemTypeByIdSuccess = createAction('[Work Item Types List] DeleteById Success', props<{dto:WorkItemTypeDto}>())

export const DeleteWorkItemTypeByIdFailure = createAction('[Work Item Types List] DeleteById Failure ', props<{error:string}>())

