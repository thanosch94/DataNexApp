import { Injectable } from '@angular/core';
import { DnColumnDto } from '../dto/dn-column.dto';
import { DocTypeAffectBehaviorEnumList } from '../enumLists/doc-type-affect-behavior.enumList';
import { DocumentTypeGroupEnumList } from '../enumLists/document-type-group.enumlist';
import { GridColumns } from '../base/grid-columns';
import { Store } from '@ngrx/store';
import { GetAllCntorDatasources } from '../state/parameters/connector-datasources/cntor-datasources.actions';
import { selectAllCntorDatasources } from '../state/parameters/connector-datasources/cntor-datasources.selectors';
import { RequestTypeEnumList } from '../enumLists/request-type.enumlist';
import { WooEntityEnumList } from '../enumLists/woo-entity.enumlist';
import { DocumentTypeGroupEnum } from '../enums/document-type-group.enum';
import { GetAllDocumentTypes } from '../state/parameters/document-types/document-types.actions';
import { selectAllDocumentTypes } from '../state/parameters/document-types/document-types.selectors';
import { GetAllCustomers } from '../state/parameters/customers/customers.actions';
import { selectAllCustomers } from '../state/parameters/customers/customers.selectors';
import { GetAllStatusesByStatusType } from '../state/parameters/statuses/statuses.actions';
import { StatusTypeEnum } from '../enums/status-type.enum';
import { selectAllStatusesByStatusType } from '../state/parameters/statuses/statuses.selectors';
import { WorkItemCategoryEnum } from '../enums/work-item-category.enum';
import { GetAllWorkItemTypesByWorkItemCategory } from '../state/parameters/work-item-types/work-item-types.actions';
import { selectAllWorkItemTypesByWorkItemCategory } from '../state/parameters/work-item-types/work-item-types.selectors';
import { selectAllAdditionalCharges } from '../state/parameters/additional-charges/additional-charges.selectors';
import { GetAllAdditionalCharges } from '../state/parameters/additional-charges/additional-charges.actions';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  private columns: { Name: string; Columns: (args?:Object) => DnColumnDto[] }[] = [];

  constructor(private store: Store) {
    this.columns = [
      { Name: GridColumns.DocumentTypes, Columns: this.getDocumentTypesColumns },
      { Name: GridColumns.DocumentSeries, Columns: this.getDocumentTypeSeriesColumns  },
      { Name: GridColumns.AdditionalCharges, Columns: this.getAdditionalChargesColumns },
      { Name: GridColumns.Brands, Columns: this.getBrandsColumns },
      { Name: GridColumns.CntorDatasourceEntities, Columns:this.getCntorDatasourceEntitiesColumns},
      { Name: GridColumns.Companies, Columns:this.getCompaniesColumns},
      { Name: GridColumns.Statuses, Columns:this.getStatusesColumns},
      { Name: GridColumns.VatClasses, Columns:this.getVatClassesColumns},
      { Name: GridColumns.WorkItemTypes, Columns:this.getWorkItemTypesColumns},
      { Name: GridColumns.CntorDatasources, Columns:this.getCntorDatasourcesColumns},
      { Name: GridColumns.CntorDatasourcesOptions, Columns:this.getCntorDatasourcesOptionsColumns},
      { Name: GridColumns.WooConnections, Columns:this.getWooConnectionsColumns},
      { Name: GridColumns.DocumentsList, Columns:this.getDocumentsListColumns},
      { Name: GridColumns.ProductsList, Columns:this.getProductsListColumns},
      { Name: GridColumns.LogsList, Columns:this.getLogsListColumns},
      { Name: GridColumns.CustomerList, Columns:this.getCustomerListColumns},
      { Name: GridColumns.TasksList, Columns:this.getTasksListColumns},
      { Name: GridColumns.UsersList, Columns:this.getUsersListColumns},
      { Name: GridColumns.WarehousesList, Columns:this.getWarehousesListColumns},
      { Name: GridColumns.DocumentAdditionalCharges, Columns:this.getDocumentAdditionalChargesColumns},
      { Name: GridColumns.AccountsReceivableCustomerDocuments, Columns:this.getAccountsReceivablesCustomerDocumentsColumns},
      { Name: GridColumns.AccountsReceivable, Columns:this.getAccountsReceivablesColumns},
      { Name: GridColumns.CustomersLedger, Columns:this.getCustomersLedgerColumns},
      { Name: GridColumns.ProductSizesList, Columns:this.getProductSizesListColumns},
      { Name: GridColumns.ShippingMethodsList, Columns:this.getShippingMethodsListColumns},
      { Name: GridColumns.PaymentMethodsList, Columns:this.getPaymentMethodsListColumns},
    ];
  }

  getColumns(name: string, args?:Object): DnColumnDto[] {
    let data = this.columns.find((x) => x.Name == name);
    if (data) {
      return data.Columns(args);
    } else {
      return [];
    }
  }

  private getDocumentTypeSeriesColumns = (): DnColumnDto[] => [
    {
      DataField: 'Id',
      DataType: 'string',
      Caption: 'Id',
      Visible: false,
    },
    {
      DataField: 'Code',
      DataType: 'string',
      Caption: 'Code',
    },
    {
      DataField: 'Abbreviation',
      DataType: 'string',
      Caption: 'Abbreviation',
    },
    {
      DataField: 'Name',
      DataType: 'string',
      Caption: 'Name',
    },
    {
      DataField: 'Prefix',
      DataType: 'string',
      Caption: 'Prefix',
    },
    {
      DataField: 'Suffix',
      DataType: 'string',
      Caption: 'Suffix',
    },
    {
      DataField: 'CurrentNumber',
      DataType: 'number',
      Caption: 'CurrentNumber',
      ReadOnly: true,
    },
    {
      DataField: 'IsActive',
      DataType: 'boolean',
      Caption: 'Active',
    },
    {
      DataField: 'DocumentTypeId',
      DataType: 'string',
      Caption: 'Type',
      Visible: false,
    },
    {
      DataField: 'buttons',
      DataType: 'buttons',
      Caption: '',
    }
  ];

  private getDocumentTypesColumns = (): DnColumnDto[] => [
    {
      DataField: 'Id',
      DataType: 'string',
      Caption: 'Id',
      Visible: false,
    },
    {
      DataField: 'Code',
      DataType: 'string',
      Caption: 'Code',
    },
    {
      DataField: 'Name',
      DataType: 'string',
      Caption: 'Name',
    },
    {
      DataField: 'Abbreviation',
      DataType: 'string',
      Caption: 'Abbreviation',
    },
    {
      DataField: 'DocumentTypeGroup',
      DataType: 'number',
      Caption: 'Document Type Group',
      Lookup: {
        DataSource: DocumentTypeGroupEnumList.value,
        ValueExpr: 'Id',
        DisplayExpr: 'Name',
      },
    },
    {
      DataField: 'Decription',
      DataType: 'string',
      Caption: 'Decription',
      Visible: false,
    },
    {
      DataField: 'PersonBalanceAffectBehavior',
      DataType: 'string',
      Caption: 'Affects Balance',
      Visible: true,
      Lookup: {
        DataSource: DocTypeAffectBehaviorEnumList.value,
        ValueExpr: 'Id',
        DisplayExpr: 'Name',
      },
    },
    {
      DataField: 'WareHouseAffectBehavior',
      DataType: 'string',
      Caption: 'Affects Warehouse',
      Visible: true,
      Lookup: {
        DataSource: DocTypeAffectBehaviorEnumList.value,
        ValueExpr: 'Id',
        DisplayExpr: 'Name',
      },
    },
    {
      DataField: 'IsActive',
      DataType: 'boolean',
      Caption: 'Is Active',
      Visible: true,
    },
    {
      DataField: 'buttons',
      DataType: 'buttons',
      Caption: '',
    }
  ];

  private getAdditionalChargesColumns = (): DnColumnDto[] => [
    {
      DataField: 'Id',
      DataType: 'string',
      Caption: 'Id',
      Visible: false,
    },
    {
      DataField: 'Code',
      DataType: 'string',
      Caption: 'Code',
    },
    {
      DataField: 'Name',
      DataType: 'string',
      Caption: 'Name',
    },
    {
      DataField: 'buttons',
      DataType: 'buttons',
      Caption: '',
    }
  ];

  private getBrandsColumns = (): DnColumnDto[] => [
    {
      DataField: 'Id',
      DataType: 'string',
      Caption: 'Id',
      Visible: false,
    },
    {
      DataField: 'Code',
      DataType: 'string',
      Caption: 'Code',
    },
    {
      DataField: 'Name',
      DataType: 'string',
      Caption: 'Name',
    },
    {
      DataField: 'buttons',
      DataType: 'buttons',
      Caption: '',
    }
  ];

  private getCntorDatasourceEntitiesColumns = (): DnColumnDto[] => {
    this.store.dispatch(GetAllCntorDatasources.action());
    let cntorDatasources$ = this.store.select(selectAllCntorDatasources)

    return [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'CntorDatasourceId',
        DataType: 'string',
        Caption: 'Datasource',
        Lookup: {
          DataSource$: cntorDatasources$,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Description',
        DataType: 'string',
        Caption: 'Description',
      },
      {
        DataField: 'Icon',
        DataType: 'string',
        Caption: 'Icon',
      },
      {
        DataField: 'IconColor',
        DataType: 'string',
        Caption: 'IconColor',
      },
      {
        DataField: 'CompanyId',
        Visible: false,
        DataType: 'string',
        Caption: 'CompanyId',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      }
    ];
  };

  private getCompaniesColumns = (): DnColumnDto[] => [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'IsDefault',
        DataType: 'boolean',
        Caption: 'Is Default',
        Visible: true,
        DefaultValue: false,
      },
      {
        DataField: 'IsActive',
        DataType: 'boolean',
        Caption: 'Is Active',
        Visible: true,
        DefaultValue: true,
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      }
    ];

  private getStatusesColumns = (): DnColumnDto[] => [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Icon',
        DataType: 'string',
        Caption: 'Icon',
      },
      {
        DataField: 'IconColor',
        DataType: 'string',
        Caption: 'Icon Color',
      },
      {
        DataField: 'Order',
        DataType: 'number',
        Caption: 'Order',
      },
      {
        DataField: 'IsDefault',
        DataType: 'boolean',
        Caption: 'Is Default',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

  private getVatClassesColumns = (): DnColumnDto[] => [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Abbreviation',
        DataType: 'string',
        Caption: 'Abbreviation',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Rate',
        DataType: 'number',
        Caption: 'Rate',
      },
      {
        DataField: 'Decription',
        DataType: 'string',
        Caption: 'Decription',
        Visible: false,
      },
      {
        DataField: 'IsActive',
        DataType: 'boolean',
        Caption: 'Is Active',
        Visible: true,
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

  private getWorkItemTypesColumns = (): DnColumnDto[] =>[
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Icon',
        DataType: 'string',
        Caption: 'Icon',
      },
      {
        DataField: 'IconColor',
        DataType: 'string',
        Caption: 'Icon Color',
      },
      {
        DataField: 'IsDefault',
        DataType: 'boolean',
        Caption: 'Is Default',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

  private getCntorDatasourcesColumns = (): DnColumnDto[] =>[
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Description',
        DataType: 'string',
        Caption: 'Description',
      },
      {
        DataField: 'Icon',
        DataType: 'string',
        Caption: 'Icon',
      },
      {
        DataField: 'IconColor',
        DataType: 'string',
        Caption: 'IconColor',
      },
      {
        DataField: 'HasCustomImage',
        DataType: 'boolean',
        Caption: 'HasCustomImage',
      },
      {
        DataField: 'CustomImagePath',
        DataType: 'string',
        Caption: 'CustomImagePath',
      },
      {
        DataField: 'CustomImageWidth',
        DataType: 'number',
        Caption: 'CustomImageWidth',
      },
      {
        DataField: 'CompanyId',
        Visible: false,
        DataType: 'string',
        Caption: 'CompanyId',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

  private getCntorDatasourcesOptionsColumns = (): DnColumnDto[] =>[
        {
          DataField: 'Id',
          DataType: 'string',
          Caption: 'Id',
          Visible: false,
        },
        {
          DataField: 'Name',
          DataType: 'string',
          Caption: 'Name',
        },
        {
          DataField: 'RequestType',
          DataType: 'number',
          Caption: 'Request Type',
          Lookup:{
            DataSource:RequestTypeEnumList.value,
            ValueExpr:'Id',
            DisplayExpr:'Name'
          }
        },
        {
          DataField: 'WooEntity',
          DataType: 'number',
          Caption: 'Entity',
          Lookup:{
            DataSource:WooEntityEnumList.value,
            ValueExpr:'Id',
            DisplayExpr:'Name'
          }
        },
        {
          DataField: 'Endpoint',
          DataType: 'string',
          Caption: 'Endpoint',
        },
        {
          DataField: 'buttons',
          DataType: 'buttons',
          Caption: '',
        },
      ];

  private getWooConnectionsColumns = (): DnColumnDto[] =>[
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'RequestType',
        DataType: 'number',
        Caption: 'Request Type',
        Lookup: {
          DataSource: RequestTypeEnumList.value,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'WooEntity',
        DataType: 'number',
        Caption: 'Entity',
        Lookup: {
          DataSource: WooEntityEnumList.value,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'Endpoint',
        DataType: 'string',
        Caption: 'Endpoint',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

  private getDocumentsListColumns = (args:any): DnColumnDto[] =>{
    this.store.dispatch(GetAllDocumentTypes.action())
    this.store.dispatch(GetAllCustomers.action())
    this.store.dispatch(GetAllStatusesByStatusType({statusType:StatusTypeEnum.Document}))
    let docTypes = this.store.select(selectAllDocumentTypes)
    let customers = this.store.select(selectAllCustomers)
    let docStatuses = this.store.select(selectAllStatusesByStatusType(StatusTypeEnum.Document))

    return [
        {
          DataField: 'select',
          DataType: 'select',
          Caption: 'select',
          Visible: true,
        },
        {
          DataField: 'Id',
          DataType: 'string',
          Caption: 'Id',
          Visible: false,
        },
        {
          DataField: 'DocumentDateTime',
          DataType: 'datetime',
          Caption: 'Date',
          Visible: true,
          Format: 'dd/MM/yyyy',
        },
        {
          DataField: 'DocumentCode',
          DataType: 'string',
          Caption: 'Code',
        },
        {
          DataField: 'DocumentTypeId',
          DataType: 'string',
          Caption: 'Type',
          Lookup: {
            DataSource$: docTypes,
            ValueExpr: 'Id',
            DisplayExpr: 'Name',
          },
          Visible: false,
        },
        {
          DataField: 'CustomerId',
          DataType: 'string',
          Caption: 'Customer',
          Lookup: {
            DataSource$: customers,
            ValueExpr: 'Id',
            DisplayExpr: 'Name',
          },
          Visible: args["documentGroup"] == DocumentTypeGroupEnum.Sales,
        },
        // {
        //   DataField: 'SupplierId',
        //   DataType: 'string',
        //   Caption: 'Supplier',
        //   Lookup: {
        //     DataSource: this.suppliersDataSource,
        //     ValueExpr: 'Id',
        //     DisplayExpr: 'Name',
        //   },
        //   Visible: args["documentGroup"] == DocumentTypeGroupEnum.Purchasing,
        // },
        {
          DataField: 'DocumentStatusId',
          DataType: 'string',
          Caption: 'Status',
          Lookup: {
            DataSource$: docStatuses,
            ValueExpr: 'Id',
            DisplayExpr: 'Name',
          },
        },

        {
          DataField: 'DocumentTotal',
          DataType: 'number',
          Caption: 'Total',
          DisplayColumnTotal: true,
        },
        {
          DataField: 'buttons',
          DataType: 'buttons',
          Caption: '',
        },
      ];
    }


  private getProductsListColumns = (): DnColumnDto[] => [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Sku',
        DataType: 'string',
        Caption: 'Sku',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },

      {
        DataField: 'RetailPrice',
        DataType: 'number',
        Caption: 'Price',
      },
      {
        DataField: 'BrandName',
        DataType: 'string',
        Caption: 'Brand',
      },
      // {
      //   DataField: 'Brand',
      //   DataType: 'string',
      //   Caption: 'Brand',
      //   Lookup: {
      //     DataSource: this.brands,
      //     ValueExpr: 'Id',
      //     DisplayExpr: 'Name',
      //   },
      // },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

  private getLogsListColumns = (): DnColumnDto[] =>[
      {
        DataField:'Id',
        DataType:'string',
        Caption:'Id',
        Visible:false
      },
      {
        DataField:'DateAdded',
        DataType:'date',
        Caption:'Date',
        Format:"dd/MM/yyyy HH:mm"
      },
      {
        DataField:'LogName',
        DataType:'string',
        Caption:'Name',
        WrapText:true
      },
      {
        DataField:'LogTypeName',
        DataType:'string',
        Caption:'Log Type',
      },
      {
        DataField:'LogOriginName',
        DataType:'string',
        Caption:'Log Origin',
      }
    ]

  private getCustomerListColumns = (): DnColumnDto[] =>[
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Address',
        DataType: 'string',
        Caption: 'Address',
      },
      {
        DataField: 'Region',
        DataType: 'string',
        Caption: 'Region',
      },
      {
        DataField: 'PostalCode',
        DataType: 'string',
        Caption: 'Postal Code',
      },
      {
        DataField: 'City',
        DataType: 'string',
        Caption: 'City',
      },
      {
        DataField: 'Country',
        DataType: 'string',
        Caption: 'Country',
      },
      {
        DataField: 'Phone1',
        DataType: 'string',
        Caption: 'Phone 1',
      },
      {
        DataField: 'Phone2',
        DataType: 'string',
        Caption: 'Phone 2',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ]

  private getTasksListColumns = (): DnColumnDto[] =>{
    this.store.dispatch(GetAllStatusesByStatusType({ statusType: StatusTypeEnum.Task }));
    this.store.dispatch(GetAllWorkItemTypesByWorkItemCategory({ workItemCategory: WorkItemCategoryEnum.Task }));
    let statusesDataSource = this.store.select(selectAllStatusesByStatusType(StatusTypeEnum.Task))
    let taskTypesDataSource = this.store.select(selectAllWorkItemTypesByWorkItemCategory(WorkItemCategoryEnum.Task))

    return [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'SerialNumber',
        DataType: 'number',
        Caption: 'S/N',
        ReadOnly: true,
        Width: 70,
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Title',
      },
      {
        DataField: 'Description',
        DataType: 'string',
        Caption: 'Description',
      },
      {
        DataField: 'StatusId',
        DataType: 'string',
        Caption: 'Status',
        Lookup: {
          DataSource$: statusesDataSource,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'WorkItemTypeId',
        DataType: 'string',
        Caption: 'Type',
        Lookup: {
          DataSource$: taskTypesDataSource,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  private getUsersListColumns = (): DnColumnDto[] =>[
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Full Name',
      },
      {
        DataField: 'Email',
        DataType: 'string',
        Caption: 'E-mail',
      },
      {
        DataField: 'UserName',
        DataType: 'string',
        Caption: 'UserName',
      },
      {
        DataField: 'IsActive',
        DataType: 'boolean',
        Caption: 'Active',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

  private getWarehousesListColumns = (): DnColumnDto[] =>[
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'IsDefault',
        DataType: 'boolean',
        Caption: 'Is Default',
      },
      {
        DataField: 'CompanyId',
        DataType: 'number',
        Caption: 'Company',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

  private getDocumentAdditionalChargesColumns = (): DnColumnDto[] =>{
    this.store.dispatch(GetAllAdditionalCharges.action());
    let additionalCharges$ = this.store.select(selectAllAdditionalCharges)
    return [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'AdditionalChargeId',
        DataType: 'string',
        Caption: 'Charge',
        Lookup: {
          DataSource$: additionalCharges$,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'AdditionalChargeAmount',
        DataType: 'number',
        Caption: 'Amount',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  private getAccountsReceivablesCustomerDocumentsColumns = (): DnColumnDto[] =>{
    this.store.dispatch(GetAllCustomers.action());
    let customers$ = this.store.select(selectAllCustomers)
    return [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'DocumentDateTime',
        DataType: 'datetime',
        Caption: 'Date',
        Visible: true,
        Format: 'dd/MM/yyyy',
      },
      {
        DataField: 'DocumentCode',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'CustomerId',
        DataType: 'string',
        Caption: 'Customer',
        Lookup: {
          DataSource$: customers$,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'DocumentTotal',
        DataType: 'number',
        Caption: 'Total',
        DisplayColumnTotal: true,
      },
      // {
      //   DataField: 'buttons',
      //   DataType: 'buttons',
      //   Caption: '',
      // }
    ];
  }

  private getAccountsReceivablesColumns = (): DnColumnDto[] =>{
    return [
      {
        DataField: 'CustomerName',
        DataType: 'string',
        Caption: 'Customer',
        Visible: true,
      },
      {
        DataField: 'ReceivableTotal',
        DataType: 'number',
        Caption: 'Receivable Total',
        Visible: true,
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  private getCustomersLedgerColumns = (): DnColumnDto[] =>{
    this.store.dispatch(GetAllCustomers.action());
    let customers$ = this.store.select(selectAllCustomers)

    return [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'DocumentDateTime',
        DataType: 'datetime',
        Caption: 'Date',
        Visible: true,
        Format: 'dd/MM/yyyy',
      },
      {
        DataField: 'DocumentCode',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'CustomerId',
        DataType: 'string',
        Caption: 'Customer',
        Lookup: {
          DataSource$: customers$,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'DocumentTotal',
        DataType: 'number',
        Caption: 'Total',
        DisplayColumnTotal: true,
      },
      // {
      //   DataField: 'buttons',
      //   DataType: 'buttons',
      //   Caption: '',
      // }
    ];
  }


  private getProductSizesListColumns  = (): DnColumnDto[] =>[
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Abbreviation',
        DataType: 'string',
        Caption: 'Abbreviation',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

  private getShippingMethodsListColumns  = (): DnColumnDto[] =>[
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
        ReadOnly:true
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Notes',
        DataType: 'string',
        Caption: 'Notes',
      },
      {
        DataField: 'IsActive',
        DataType: 'boolean',
        Caption: 'Active',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

  private getPaymentMethodsListColumns  = (): DnColumnDto[] =>[
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
        ReadOnly:true
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Notes',
        DataType: 'string',
        Caption: 'Notes',
      },
      {
        DataField: 'IsActive',
        DataType: 'boolean',
        Caption: 'Active',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

