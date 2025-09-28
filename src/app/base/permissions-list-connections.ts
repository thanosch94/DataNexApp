import { taskEditComponentId, TaskEditPermissionsList } from "../pages/task-edit/task-edit-permissions";
import { taskListComponentId, TaskListPermissionsList } from "../pages/task-list/task-list-permissions";

export class PermissionsListConnections {

  static  components:any[]=[
    {
      Name:"Task List",
      MasterEntityId:taskListComponentId,
      PermissionsList:TaskListPermissionsList
    },
    {
      Name:"Task Edit",
      MasterEntityId:taskEditComponentId,
      PermissionsList:TaskEditPermissionsList
    },

  ]
}
