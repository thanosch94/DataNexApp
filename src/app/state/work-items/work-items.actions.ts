import { createAction, props } from "@ngrx/store"
import { WorkItemDto } from "../../dto/work-item.dto"
import { Guid } from "guid-typescript"
import { WorkItemCategoryEnum } from "../../enums/work-item-category.enum"


//Get All
export const GetAllWorkItems = createAction('[Work Item  List] GetAll')

export const GetAllWorkItemsSuccess = createAction('[Work Item  List] GetAll Success', props<{data:WorkItemDto[]}>())

export const GetAllWorkItemsFailure = createAction('[Work Item  List] GetAll Failure', props<{error:string}>())

//Get By Id
export const GetWorkItemById = createAction('[Work Item Edit] Get Work Item By Id', props<{id:Guid}>())

export const GetWorkItemByIdSuccess = createAction('[Work Item Edit] Get Work Item By Id Success', props<{ dto: WorkItemDto }>());

export const GetWorkItemByIdFailure = createAction('[Work Item Edit] Get Work Item By Id Failure', props<{ error: string }>());

export const ClearSelectedWorkItem = createAction('[Work Item Edit] Clear Selected Work Item');

//Get By Work Item Category
export const GetAllWorkItemsByWorkItemCategory = createAction('[Work Item List] GetAllByWorkItemCategoy', props<{workItemCategory:WorkItemCategoryEnum}>())

export const GetAllWorkItemsByWorkItemCategorySuccess = createAction('[Work Item List] GetAllByWorkItemCategory Success', props<{data:WorkItemDto[], workItemCategory:WorkItemCategoryEnum}>())

export const GetAllWorkItemsByWorkItemCategoryFailure = createAction('[Work Item List] GetAllByWorkItemCategory Failure', props<{error:any}>())



//InsertDto
export const InsertWorkItemDto = createAction('[Work Item  List] InsertDto', props<{dto:WorkItemDto}>())

export const InsertWorkItemDtoSuccess = createAction('[Work Item  List] InsertDto Success', props<{dto:WorkItemDto}>())

export const InsertWorkItemDtoFailure = createAction('[Work Item  List] InsertDto Failure', props<{error:string}>())


//UpdateDto
export const UpdateWorkItemDto = createAction('[Work Item  List] UpdateDto', props<{dto:WorkItemDto}>())

export const UpdateWorkItemDtoSuccess = createAction('[Work Item  List] UpdateDto Success', props<{dto:WorkItemDto}>())

export const UpdateWorkItemDtoFailure = createAction('[Work Item  List] UpdateDto Failure', props<{error:string}>())

//DeleteById

export const DeleteWorkItemById = createAction('[Work Item  List] DeleteById', props<{id:Guid}>())

export const DeleteWorkItemByIdSuccess = createAction('[Work Item  List] DeleteById Success', props<{dto:WorkItemDto}>())

export const DeleteWorkItemByIdFailure = createAction('[Work Item  List] DeleteById Failure ', props<{error:string}>())

