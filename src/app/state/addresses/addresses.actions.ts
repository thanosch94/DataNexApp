import { AddressDto } from "../../dto/address.dto";
import { CustomerAddressDto } from "../../dto/customer-address.dto";
import { addDeleteAction, addGetAction, addInsertAction, addUpdateAction } from "../shared/actions.factory";

export const GetAllAddresses = addGetAction<AddressDto>("[Addresses] Get All ");

export const InsertAddress = addInsertAction<AddressDto>("[Addresses] Insert Dto")

export const UpdateAddress = addUpdateAction<AddressDto>("[Addresses] Update Dto")

export const DeleteAddress = addDeleteAction<AddressDto>("[Addresses] Delete By Id")

export const InsertCustomerAddress = addInsertAction<CustomerAddressDto>("[Customer Addresses] Insert Dto")

export const UpdateCustomerAddress = addUpdateAction<CustomerAddressDto>("[Customer Addresses] Update Dto")

export const DeleteCustomerAddress = addDeleteAction<CustomerAddressDto>("[Customer Addresses] Delete By Id")




