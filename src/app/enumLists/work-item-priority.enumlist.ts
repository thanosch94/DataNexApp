import { WorkItemPriority } from "../enums/work-item-priority.enum";

export class WorkItemPriorityEnumlist {
    static value = [
      { Id: WorkItemPriority.None, Name: 'None' },
      { Id: WorkItemPriority.SuperHigh, Name: 'SuperHigh' },
      { Id: WorkItemPriority.High, Name: 'High' },
      { Id: WorkItemPriority.Normal, Name: 'Normal' },
      { Id: WorkItemPriority.Low, Name: 'Low' },
    ];
}
