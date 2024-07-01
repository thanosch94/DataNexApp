import { Guid } from 'guid-typescript';
import { MenuItemDto } from '../dto/menu-item.dto';
import { AppTabDto } from '../dto/app-tab.dto';

export class WebAppBase {
  static version = 1.06;
  static data: any;
  static isLoggedIn: boolean;

  static wordpressDataSource = "84481ee6-2f65-466d-8774-679b560862e9"
  static magentoDataSource = "af9c50a7-f71c-43d3-918d-467f0a049c3d"

  static connectorDataSourcesList = [
    {
      Id: WebAppBase.wordpressDataSource,
      Name:"Wordpress"
    },
    {
      Id: WebAppBase.magentoDataSource,
      Name:"Magento"
    }
  ]

  static currency = '€';
}
