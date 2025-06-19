import { Guid } from "guid-typescript";

export class CntorDatasourceDto {
Id:Guid;
Name:string;
Description?:string;
Icon?:string;
IconColor?:string;
HasCustomImage:boolean;
CustomImagePath:string;
CustomImageWidth:number;
CompanyId:Guid;
}
