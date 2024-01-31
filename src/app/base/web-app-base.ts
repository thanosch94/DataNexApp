import { Guid } from "guid-typescript";
import { MenuItemDto } from "../dto/menu-item.dto";

export class WebAppBase {

static data:any
  static menu:MenuItemDto[] =[
    {
      Id:Guid.parse("b76f583b-cc8d-4873-a5bd-ec213d9ad380"),
      Name: "Customers",
      Path: "customers-list"
    },
    {
      Id:Guid.parse("af9d9c1e-f397-4d3c-b01a-7c10d23ace92"),
      Name: "Orders",
      Path: "orders-list"
    },
    {
      Id:Guid.parse("6da03f89-0c52-4e95-a919-555525905849"),
      Name: "Products",
      Path: "products-list"
    },
    {
      Id:Guid.parse("f461eaa6-6d3d-4a29-b11e-27bc5003b353"),
      Name: "Users",
      Path: "users-list"
    }
  ]
}
