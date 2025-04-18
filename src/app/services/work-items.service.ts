import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Guid } from 'guid-typescript';
import { WorkItemDto } from '../dto/work-item.dto';
import { WorkItemCategoryEnum } from '../enums/work-item-category.enum';

@Injectable({
  providedIn: 'root'
})
export class WorkItemsService {
 service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();

  }

  public GetAll() {
    return this.http.get(this.service + 'WorkItems/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'WorkItems/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }
  public GetallByUserId(userId: Guid) {
    return this.http.get(this.service + 'WorkItems/getallByUserId/' + userId, {
      headers: this.auth.headers,
    });
  }

  public GetAllByWorkItemCategory(workItemCategory: WorkItemCategoryEnum) {
    return this.http.get(this.service + 'WorkItems/getallByWorkItemCategory/' + workItemCategory, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(dto:WorkItemDto) {
    return this.http.post(this.service + 'WorkItems/insertdto', dto, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(dto:WorkItemDto) {
    return this.http.put(this.service + 'WorkItems/updatedto', dto, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'WorkItems/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}
