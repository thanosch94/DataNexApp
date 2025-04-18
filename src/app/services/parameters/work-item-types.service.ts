import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { WorkItemCategoryEnum } from '../../enums/work-item-category.enum';
import { WorkItemTypeDto } from '../../dto/work-item-type.dto';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class WorkItemTypesService {
  service: string;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get(this.service + 'WorkItemTypes/getall', {
      headers: this.auth.headers,
    });
  }
  public GetAllWorkItemTypesByWorkItemCategory(workItemCategory: WorkItemCategoryEnum) {
    return this.http.get(
      this.service + 'WorkItemTypes/getallByWorkItemCategory/' + workItemCategory,
      {
        headers: this.auth.headers,
      }
    );
  }

  public InsertDto(workItemType: WorkItemTypeDto) {
    debugger
    return this.http.post(this.service + 'WorkItemTypes/insertdto', workItemType, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(workItemType: WorkItemTypeDto) {
    return this.http.put(this.service + 'WorkItemTypes/updatedto', workItemType, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'WorkItemTypes/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}
