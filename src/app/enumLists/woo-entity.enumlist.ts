import { WooEntityEnum } from "../enums/woo-entity.enum";

export class WooEntityEnumList {
  static value = [
    { Id: WooEntityEnum.Products, Name: 'Products' },
    { Id: WooEntityEnum.Attributes, Name: 'Attributes' },
    { Id: WooEntityEnum.Terms, Name: 'Terms' },
    { Id: WooEntityEnum.Categories, Name: 'Categories' },
    { Id: WooEntityEnum.Orders, Name: 'Orders' },
  ];
}
