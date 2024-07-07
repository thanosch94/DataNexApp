import { Guid } from 'guid-typescript';
import { MenuItemDto } from '../dto/menu-item.dto';
import { DocumentTypeGroupEnum } from '../enums/document-type-group.enum';

export class Navigation {

  static data:any;
  static menu: MenuItemDto[] = [
    {
      Id: Guid.parse('5131c4bc-befe-4d8c-8f44-03c2b69767d9'),
      Name: 'Sales',
      Path: 'sales',
      IsOpen: true,
      Icon: 'faShopingCart',
      Children: [
        {
          Id: Guid.parse('af9d9c1e-f397-4d3c-b01a-7c10d23ace92'),
          Name: 'Sales Documents',
          Path: 'documents-list',
          Params: { Group: DocumentTypeGroupEnum.Sales, Type:"SalesDocuments" },
        },
        {
          Id: Guid.parse('abfa413f-55d1-4a44-a492-aa46b979a404'),
          Name: 'Invoices',
          Path: 'documents-list',
          Params: { Group: DocumentTypeGroupEnum.Sales, Type:"Invoices-Receipts"  },
        },
        {
          Id: Guid.parse('b76f583b-cc8d-4873-a5bd-ec213d9ad380'),
          Name: 'Customers',
          Path: 'customers-list',
        },
        {
          Id: Guid.parse('6e8fb811-fe78-4846-981e-afdd8faf34cf'),
          Name: 'Sales Reports',
          Path: 'sales-reports',
        },
      ],
    },
    {
      Id: Guid.parse('3a070c73-4fda-40cf-b2e3-e48e8a178610'),
      Name: 'Purchasing',
      Path: 'purchasing',
      Icon: 'faReceipt',
      Children: [
        {
          Id: Guid.parse('cacf4576-eb86-44df-9974-47c4cf6778fd'),
          Name: 'Purchase Orders',
          Path: 'documents-list',
          Params: { Group: DocumentTypeGroupEnum.Purchasing, Type:"PurchaseDocuments"},
        },
        {
          Id: Guid.parse('2e6665d4-0552-40e8-abe1-6211ad027574'),
          Name: "Suppliers' Invoices",
          Path: 'documents-list',
          Params: { Group: DocumentTypeGroupEnum.Purchasing, Type:"SupplierInvoices"},
        },
        {
          Id: Guid.parse('0aa967a4-12cb-46fd-ac6e-4d34f172ff28'),
          Name: "Suppliers",
          Path: 'suppliers-list',
        },
        {
          Id: Guid.parse('eb36e8ad-1746-4446-aaa7-15d1c1ffbb1a'),
          Name: 'Purchase Reports',
          Path: 'purchase-reports',
        },
      ],
    },
    {
      Id: Guid.parse('84b23ae4-78d7-4eb9-9110-04d85e086647'),
      Name: 'Inventory',
      Path: 'inventory',
      Icon: 'faBoxes',
      Children: [
        {
          Id: Guid.parse('6da03f89-0c52-4e95-a919-555525905849'),
          Name: 'Products',
          Path: 'products-list',
        },
        {
          Id: Guid.parse('e6704ca6-0517-47a4-a3a0-da4aa067ef53'),
          Name: 'Warehouses',
          Path: 'warehouses-list',
        },
        {
          Id: Guid.parse('ce490dc9-2e06-40a3-9281-b29fc5c0b6f5'),
          Name: 'Inventory Adjustments',
          Path: 'documents-list',
          Params: { Group: DocumentTypeGroupEnum.Inventory, Type:"InventoryAdjustments"},

        },
        {
          Id: Guid.parse('54c97182-cf12-48ae-8df0-f78c0a2576b2'),
          Name: 'Inventory Reports',
          Path: 'inventory-reports',
        },
      ],
    },
    {
      Id: Guid.parse('277ecbfd-bf12-4ee0-8685-d01a431772ff'),
      Name: 'Finance',
      Path: 'finance',
      Icon: 'faDollarSign',
      Children: [
        {
          Id: Guid.parse('8da5e45f-fcb4-462d-9a1a-86f99a5765c4'),
          Name: 'Accounts Payable',
          Path: 'accounts-payable',
        },
        {
          Id: Guid.parse('6a006f0c-6388-4993-95a5-93a87e9010d3'),
          Name: 'Accounts Receivable',
          Path: 'accounts-receivable',
        },
        {
          Id: Guid.parse('1a7b0e61-0157-43ce-b666-c6ffaf095790'),
          Name: 'Customers ledger',
          Path: 'customers-ledger',
        },
        {
          Id: Guid.parse('0d79f95d-226e-4b1a-9a28-f9390c1b6ffa'),
          Name: 'Tax Management',
          Path: 'tax-management',
        },
        {
          Id: Guid.parse('153c629d-4b71-4155-a6eb-caec660cac87'),
          Name: 'Financial Reports',
          Path: 'tax-management',
        },
      ],
    },
    {
      Id: Guid.parse('20949a62-6722-48ea-b2cb-800f116c8e11'),
      Name: 'Human Resources',
      Path: 'human-resources',
      Icon: 'faUserTie',
      Children: [
        {
          Id: Guid.parse('54aefd03-0919-4754-bbf0-a358847d0b55'),
          Name: 'Employee Records',
          Path: 'employee-records',
        },
        {
          Id: Guid.parse('6ecb41b0-2d65-45aa-ab42-778af348cb61'),
          Name: 'Payroll',
          Path: 'payroll',
        },
        {
          Id: Guid.parse('c706e323-9a4f-4f61-884c-c7dd3f6f0ad2'),
          Name: 'Recruitment',
          Path: 'recruitment',
        },
        {
          Id: Guid.parse('91ea830f-cd82-47bf-a50d-c0e12802c3d8'),
          Name: 'Training & Development',
          Path: 'training-development',
        },
        {
          Id: Guid.parse('ce0f90b7-7da4-4740-b44e-ab000c9e0d2c'),
          Name: 'HR Reports',
          Path: 'hr-reports',
        },
      ],
    },
    {
      Id: Guid.parse('453007a8-bb78-4f1b-9b88-5b6176ecf7fb'),
      Name: 'Administration',
      Path: 'administration',
      Icon: 'faCogs',
      Children: [
        {
          Id: Guid.parse('371794ea-2fae-4842-946d-d73ba8c5b5dd'),
          Name: 'Users Management',
          Path: 'users-list',
        },
        {
          Id: Guid.parse('99e1425f-94eb-40e9-9673-19590a2bc582'),
          Name: 'Permissions',
          Path: 'permissions',
        },
        {
          Id: Guid.parse('3019b36c-4858-41f5-84f2-c5268ae64833'),
          Name: 'Logs',
          Path: 'logs-list',
        },
      ],
    },
    {
      Id: Guid.parse('b5f5d441-1fdc-4601-86e4-275436aba6ac'),
      Name: 'Configuration',
      Path: 'configuration',
      Icon: 'faGear',
      Children: [
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
          Id: Guid.parse('0a0dfaf8-9c97-4317-b961-c5954435700b'),
          Name: 'Brands',
          Path: 'brands-list',
        },
        {
          Id: Guid.parse('4b1e10e7-3f93-4257-aaed-6003bcf6cdf3'),
          Name: 'Additional Charges',
          Path: 'additional-charges-list',
        },
        {
          Id: Guid.parse('a7fc9e35-0321-4742-837b-e49d262307c7'),
          Name: 'Vat Classes',
          Path: 'vat-classes-list',
        },
      ],
    },
    {
      Id: Guid.parse('ef4ac3f3-7bf5-4e22-945b-5c923ec56b5b'),
      Name: 'Extra',
      Path: 'extra',
      Icon: 'faCircle',
      Children: [
        {
          Id: Guid.parse('95a524b4-fn6b-2cb1-af29-168b3387b445'),
          Name: 'Connector',
          Path: 'connector-home',
        },
      ],
    },
  ];

}
