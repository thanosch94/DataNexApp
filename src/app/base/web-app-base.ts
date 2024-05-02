import { Guid } from 'guid-typescript';
import { MenuItemDto } from '../dto/menu-item.dto';
import { AppTabDto } from '../dto/app-tab.dto';

export class WebAppBase {
  static data: any;
  static menu: MenuItemDto[] = [
    {
      Id: Guid.parse('b76f583b-cc8d-4873-a5bd-ec213d9ad380'),
      Name: 'Customers',
      Path: 'customers-list',
    },
    {
      Id: Guid.parse('af9d9c1e-f397-4d3c-b01a-7c10d23ace92'),
      Name: 'Documents',
      Path: 'documents-list',
    },
    {
      Id: Guid.parse('6da03f89-0c52-4e95-a919-555525905849'),
      Name: 'Products',
      Path: 'products-list',
    },
    {
      Id: Guid.parse('f461eaa6-6d3d-4a29-b11e-27bc5003b353'),
      Name: 'Users',
      Path: 'users-list',
    },
  ];

  static settingsMenu: MenuItemDto[] = [
    {
      Id: Guid.parse('7cc4cbdc-44c7-405f-9b8a-a2ee1c267a04'),
      Name: 'Document Types',
      Path: 'document-types-list',
    },
    {
      Id: Guid.parse('41a596a4-df6b-4fb6-af29-188e3387b948'),
      Name: 'Product Sizes',
      Path: 'product-sizes-list',
    },
    {
      Id: Guid.parse('9590bf23-d72c-40f0-9df2-18e8f4c27ec8'),
      Name: 'Statuses',
      Path: 'statuses-list',
    },
    {
      Id: Guid.parse('41a596a4-df6b-4fb6-af29-188e3387b948'),
      Name: 'Brands',
      Path: 'brands-list',
    },
  ];

  static extraMenu: MenuItemDto[] = [
    {
      Id: Guid.parse('95a524b4-fn6b-2cb1-af29-168b3387b445'),
      Name: 'Connector',
      Path: 'connector',
    },
  ];

  static tabs = new Array<AppTabDto>();
  static currency = '€';

  static setTabName(route: string, tabName: string) {
    let activeTab = this.tabs.find(
      (x: AppTabDto) => x.Route.path == route && x.Name == ''
    );

    if (activeTab!.Name == '') {
      activeTab!.Name = tabName;
    }
  }
  static getTabs() {
    return this.tabs;
  }
}
