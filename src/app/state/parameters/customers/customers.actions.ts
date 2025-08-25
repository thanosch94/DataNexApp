import { CustomerDto } from "../../../dto/customer.dto";
import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction, addGetByIdAction } from "../../shared/actions.factory";

export const GetAllCustomers = addGetAction<CustomerDto>("[Customers] Get All ");

export const GetCustomerById = addGetByIdAction<CustomerDto>("[Customers] Get By Id ");

export const InsertCustomer = addInsertAction<CustomerDto>("[Customers] Insert Dto")

export const UpdateCustomer = addUpdateAction<CustomerDto>("[Customers] Update Dto")

export const DeleteCustomer = addDeleteAction<CustomerDto>("[Customers] Delete By Id")



