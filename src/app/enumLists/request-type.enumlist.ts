import { RequestTypeEnum } from '../enums/request-type.enum';

export class RequestTypeEnumList {
  static value = [
    { Id: RequestTypeEnum.Get, Name: 'Get' },
    { Id: RequestTypeEnum.Post, Name: 'Post' },
    { Id: RequestTypeEnum.Put, Name: 'Put' },
    { Id: RequestTypeEnum.Delete, Name: 'Delete' },
  ];
}
