import { Guid } from 'guid-typescript';
import { MenuItemDto } from '../dto/menu-item.dto';
import { AppTabDto } from '../dto/app-tab.dto';

export class WebAppBase {
  static version = 1.07;
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

    //Document Types
   static Offer = Guid.parse("ea9422a4-c930-44b4-bb1e-a87a019cf716");
   static SalesOrder = Guid.parse("580f43bd-0b77-4a93-b95e-b04f851463ea");
   static ProformaInvoice = Guid.parse("3a7da7f5-93e7-40a6-8e62-6a2836ecec96");
   static Receipt = Guid.parse("115f1623-c161-4b4f-8dc6-abbbd875d618");
   static Invoice = Guid.parse("976ed3dc-e0ee-43a4-a4ec-cf1c0a88dd07");
   static SalesDeliveryNote = Guid.parse("bdde347b-e4b5-477f-8246-439b2bf6a946");
   static PurchaseDeliveryNote = Guid.parse("a8a278ef-d5de-4a1e-b29b-652177d04d5e");
   static PurchaseOrder = Guid.parse("270dce95-9562-4c63-86ee-0aeca760ab9b");
   static PurchaseInvoice = Guid.parse("c7825a32-6007-48b4-936d-f558c9b788c3");
   static CreditNote = Guid.parse("4437b7c7-c4a1-4de9-ace3-4e807b9a5f13");
  static currency = '€';
}
