import { Injectable } from '@angular/core';
import { DnColumnDto } from '../dto/dn-column.dto';
import { DocTypeAffectBehaviorEnumList } from '../enumLists/doc-type-affect-behavior.enumList';
import { DocumentTypeGroupEnumList } from '../enumLists/document-type-group.enumlist';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  private columns: { Name: string; Columns: () => DnColumnDto[] }[] = [];

  constructor() {
    this.columns = [
      { Name: 'DocumentSeries', Columns: this.getDocumentTypeSeriesColumns },
      { Name: 'DocumentTypes', Columns: this.getDocumentTypesColumns },
    ];
  }
  getColumns(name: string): DnColumnDto[] {
    let data = this.columns.find((x) => x.Name == name);
    if (data) {
      return data.Columns();
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
    },
  ];

  private getDocumentTypesColumns = (): DnColumnDto[] => [
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
    },
  ];
}
