import { Guid } from "guid-typescript";

export class RegisterDto {
  ClientName:string;
  ClientAddress: string;
  ClientRegion?: string;
  ClientPostalCode: string;
  ClientCity: string;
  ClientCountry: string;
  ClientPhone1: string;
  ClientPhone2?: string;
  ClientEmail: string;

  CompanyName:string;
  CompanyAddress:string;
  CompanyRegion?: string;
  CompanyPostalCode: string;
  CompanyCity: string;
  CompanyCountry: string;
  CompanyPhone1: string;
  CompanyPhone2?: string;
  CompanyEmail: string;
  CompanyVatNumber:string;
  CompanyTaxOffice:string;

  CompanyLoginCode:string;

}
