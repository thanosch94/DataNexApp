import { dnIcons } from './../../../enumLists/dn-icon.list';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { WebAppBase } from '../../../base/web-app-base';
import { CustomerDto } from '../../../dto/customer.dto';
import { TabsService } from '../../../services/tabs.service';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnCheckboxComponent } from '../../components/dn-checkbox/dn-checkbox.component';
import { DnTextboxComponent } from '../../components/dn-textbox/dn-textbox.component';
import { DevToolsAdd } from '../../../decorators/dev-tools-add';
import { GenericFormComponent } from '../../components/generic-form/generic-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DnSelectboxComponent } from '../../components/dn-selectbox/dn-selectbox.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnRichTextEditorComponent } from '../../components/dn-rich-text-editor/dn-rich-text-editor.component';
import {
  DeleteCustomer,
  GetCustomerById,
  InsertCustomer,
  UpdateCustomer,
} from '../../../state/parameters/customers/customers.actions';
import { Guid } from 'guid-typescript';
import { selectCustomerById } from '../../../state/parameters/customers/customers.selectors';
import { GetAllVatClasses } from '../../../state/parameters/vat-classes/vat-classes.actions';
import { selectAllVatClasses } from '../../../state/parameters/vat-classes/vat-classes.selectors';
import { Observable, Subject } from 'rxjs';
import { VatClassDto } from '../../../dto/vat-class.dto';
import { DnDateBoxComponent } from '../../components/dn-date-box/dn-date-box.component';
import { DnNumberBoxComponent } from '../../components/dn-number-box/dn-number-box.component';
import { DnFileUploaderComponent } from '../../components/dn-file-uploader/dn-file-uploader.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatButtonModule } from '@angular/material/button';
import { AddressTypePipe } from '../../../pipes/address-type.pipe';
import {
  DeleteCustomerAddress,
  InsertCustomerAddress,
  UpdateCustomerAddress,
} from '../../../state/addresses/addresses.actions';
import { AddressDto } from '../../../dto/address.dto';
import { AddressTypeEnum } from '../../../enums/address-type.enum';
import { CustomerAddressDto } from '../../../dto/customer-address.dto';

@Component({
  selector: 'app-customer-edit',
  imports: [
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSortModule,
    MatSnackBarModule,
    CommonModule,
    MatDialogModule,
    DnToolbarComponent,
    DnTextboxComponent,
    MatTabsModule,
    DnSelectboxComponent,
    FaIconComponent,
    DnGridComponent,
    DnRichTextEditorComponent,
    DnDateBoxComponent,
    DnNumberBoxComponent,
    DnFileUploaderComponent,
    CdkAccordionModule,
    MatButtonModule,
    DnCheckboxComponent,
    AddressTypePipe,
  ],
  providers: [TabsService],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css',
})
export class CustomerEditComponent
  extends GenericFormComponent
  implements OnInit, OnDestroy
{
  @DevToolsAdd() customer_text: string;
  @DevToolsAdd() customer = signal<CustomerDto>(new CustomerDto());
  previousTabName: string;
  form: FormGroup;
  faIcons = dnIcons;
  vatClassesDataSource: Observable<VatClassDto[]>;
  private destroy$ = new Subject<void>();
  customerAddresses: CustomerAddressDto[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
    super();
    this.customer().Id = WebAppBase.data;
    WebAppBase.data = undefined;
  }

  ngOnInit() {
    this.setActionsResults();
    this.initializeForm();
    this.getLookups();
    this.getData();
  }

  //#region Initialize Form
  initializeForm() {
    this.form = this.fb.group({
      Code: [''],
      Name: ['', Validators.required],
      CustomerTypeId: [''],
      VatClassId: ['', Validators.required],
      CompanyName: [''],
      VatNumber: [''],
      TaxOffice: [''],
      Occupation: [''],
      Notes: [''],
      Email: [''],
      Phone1: [''],
      UserText1: [''],
      UserText2: [''],
      UserText3: [''],
      UserText4: [''],
      UserNumber1: [null],
      UserNumber2: [null],
      UserNumber3: [null],
      UserNumber4: [null],
      UserDate1: [null],
      UserDate2: [null],
      UserDate3: [null],
      UserDate4: [null],
      // Phone1: [''],
      // Phone2: [''],
      // FacebookUrl: [''],
      // InstagramUrl: [''],
      // LinkedInUrl: [''],
    });
  }
  //#endregion

  ngAfterViewInit() {
    this.getLookups();
    // this.form.patchValue(this.customer())
  }

  getLookups() {
    this.store.dispatch(GetAllVatClasses());
    this.vatClassesDataSource = this.store.select(selectAllVatClasses);
  }

  getData() {
    if (this.customer().Id) {
      this.store.dispatch(GetCustomerById.action({ id: this.customer().Id }));
      this.store
        .select(selectCustomerById(this.customer().Id))
        .subscribe((result: any) => {
          this.customer.set(result as CustomerDto);
          this.customerAddresses = [...this.customer().CustomerAddresses];
          this.form.patchValue(result);
          this.customer_text = this.customer().Name;
          this.tabsService.setTabName(this.customer().Name);
        });
    } else {
      this.customer_text = 'New Customer';
      this.tabsService.setTabName(this.customer_text);

      let newCustomer = new CustomerDto();
      newCustomer.CustomerAddresses = [];
      this.customer.set(newCustomer);
    }
  }

  onCloseClicked(e: any) {
    this.router.navigate(['customers-list']);
    this.tabsService.setActiveTabPreviousName();
  }

  onSaveClicked(e: any) {
    if (this.form.valid) {
      this.customer.set({ ...this.customer(), ...this.form.value });

      if (this.customer().Id) {
        this.store.dispatch(UpdateCustomer.action({ dto: this.customer() }));
      } else {
        this.customer.update((c) => ({
          ...c,
          CustomerAddresses: this.customerAddresses,
        }));
        this.store.dispatch(InsertCustomer.action({ dto: this.customer() }));
      }
    } else {
      this.markAllAsTouched(this.form);
    }
  }

  onNameBlur(e: any) {
    this.markAsTouched(this.form, 'Name');
  }

  onVatClassIdBlur(e: any) {
    this.markAsTouched(this.form, 'VatClassId');
  }

  onDeleteClicked(e: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '320px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.deleteItem(event);
      } else {
      }
    });
  }

  onDeleteCancelClicked(e: any) {
    let data = this.dialog.closeAll();
  }

  deleteItem(e: any) {
    this.store.dispatch(DeleteCustomer.action({ id: this.customer().Id }));
  }

  async onVatIdValueChanged(e: any) {
    //IF NEEDED TO CONNECT TO TO AADE TO GET AFM DATA
    // if (e.target.selectionStart == 9) {
    //   this.customersViewModel
    //     .GetFromAade('', '!', e.target.value, '')
    //     .subscribe((result: any) => {});
    // }
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  addBillingAddress(e: any) {
    if (this.customerAddresses.length > 0) {
      this.addAddress(AddressTypeEnum.Billing);
    }
  }

  addShippingAddress(e: any) {
    if (this.customerAddresses.length > 0) {
      this.addAddress(AddressTypeEnum.Shipping);
    }
  }

  addAddress(addressType: AddressTypeEnum) {
    let addressesInEditMode = this.customerAddresses.filter(
      (x) => x.IsInEditMode == true && x.AddressType == addressType
    );
    if (addressesInEditMode.length == 0) {
      let customerAddress = new CustomerAddressDto();
      customerAddress.AddressType = addressType;
      customerAddress.CustomerId = this.customer().Id;
      customerAddress.Address = new AddressDto();
      customerAddress.IsInEditMode = true;
      customerAddress.TempId = crypto.randomUUID();
      this.customerAddresses = [...this.customerAddresses, customerAddress];
    }
  }
  onSaveAddressBtnClicked(
    e: any,
    type: AddressTypeEnum,
    item: CustomerAddressDto
  ) {
    if (item.Address.Street?.trim() && item.Address.City?.trim()) {
      let dto = new CustomerAddressDto();
      dto = { ...item };
      dto.CustomerId = this.customer().Id;
      dto.AddressType = type;

      if (this.customer().Id) {
        if (!item.Id) {
          this.store.dispatch(
            InsertCustomerAddress.action({ dto })
          );
        } else {
          this.store.dispatch(
            UpdateCustomerAddress.action({ dto })
          );
        }
        item.IsInEditMode = false;
      } else {
        dto.IsInEditMode = false;

        this.customer.update((c) => {
          // check if an address with the same TempId exists
          const index = c.CustomerAddresses.findIndex(
            (x) => x.TempId === item.TempId
          );
          let updatedAddresses;

          if (index > -1) {
            // update existing
            updatedAddresses = c.CustomerAddresses.map((addr) =>
              addr.TempId === item.TempId
                ? { ...addr, ...dto }
                : addr
            );
          } else {
            // add new
            updatedAddresses = [...c.CustomerAddresses, dto];
          }

          return {
            ...c,
            CustomerAddresses: updatedAddresses,
          };
        });
        this.customerAddresses = [...this.customer().CustomerAddresses];
      }
    } else {
      this.dialog.open(DnAlertComponent, {
        width: '320px',
        data: {
          Title: 'Warning',
          Message: `Please fill all the required fields' ${
            !item.Address.Street ? 'Street' : ''
          } ${!item.Address.City ? ' City' : ''}`,
        },
      });
    }
  }

  onAddressEditBtnClicked(e: any, item: CustomerAddressDto) {
    if (item.Id) {
      const updatedAddresses = this.customerAddresses.map((addr) =>
        addr.Id === item.Id
          ? { ...addr, Address: { ...addr.Address }, IsInEditMode: true }
          : addr
      );
      this.customerAddresses = updatedAddresses;
    } else {
      const updatedAddresses = this.customerAddresses.map((addr) =>
        addr.TempId === item.TempId
          ? { ...addr, Address: { ...addr.Address }, IsInEditMode: true }
          : addr
      );
      this.customerAddresses = updatedAddresses;
    }
  }
  onAddressCancelBtnClicked(e: any, item: CustomerAddressDto) {
    item.IsInEditMode = false;
    if (item.Id) {
      const updatedAddresses = this.customerAddresses.map((addr) =>
        addr.Id === item.Id
          ? { ...addr, Address: { ...addr.Address }, IsInEditMode: false }
          : addr
      );
      this.customerAddresses = updatedAddresses;
    } else {
      const updatedAddresses = this.customerAddresses.filter(
        (x) => !x.IsInEditMode
      );
      this.customerAddresses = updatedAddresses;
    }
  }
  onAddressDeleteBtnClicked(e: any, item: CustomerAddressDto) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '320px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        debugger;
        if (item.Id) {
          this.store.dispatch(DeleteCustomerAddress.action({ id: item.Id }));
          this.getData();
        } else {
          this.customer.update((c) => ({
            ...c,
            CustomerAddresses: c.CustomerAddresses.filter(
              (addr) => addr !== item
            ),
          }));
          this.customerAddresses = this.customer().CustomerAddresses;
        }
      }
    });
  }

  addAddressBtnClass(addressType: AddressTypeEnum) {
    //If any item in the list has no id it means it is a new item
    let addresses = this.customerAddresses?.filter(
      (x) => x.AddressType == addressType
    );

    if (addresses?.length > 0) {
      let r = addresses?.every((x) => !x.IsInEditMode);
      return r ? 'button-add-row' : 'button-add-row-disabled';
    } else {
      return 'button-add-row-disabled';
    }
  }

  isAddAddressBtnDisabled(addressType: AddressTypeEnum) {
    //If any item in the list has no id it means it is a new item
    let addresses = this.customerAddresses?.filter(
      (x) => x.AddressType == addressType
    );
    if (addresses?.length > 0) {
      let r = addresses?.every((x) => !x.IsInEditMode);
      return r;
    } else {
      return true;
    }
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertCustomerSuccess: InsertCustomer.actionSuccess,
        insertCustomerFailure: InsertCustomer.actionFailure,
        updateCustomerSuccess: UpdateCustomer.actionSuccess,
        updateCustomerFailure: UpdateCustomer.actionFailure,
        deleteCustomerSuccess: DeleteCustomer.actionSuccess,
        deleteCustomerFailure: DeleteCustomer.actionFailure,
      },
      {
        insertCustomerSuccess: (result: any) => {
          this.customer.set(result.dto);
          this.displayNotification('Record inserted');
          this.getData();
        },
        insertCustomerFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateCustomerSuccess: (result: any) => {
          this.customer.set(result.dto);
          this.displayNotification('Record updated');
          this.getData();
        },
        updateCustomerFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        deleteCustomerSuccess: () => {
          this.displayNotification('Record deleted');
          this.tabsService.setActiveTabPreviousName();
          this.router.navigate(['customers-list']);
        },
        deleteCustomerFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
      },
      this.destroy$
    );

    this.setPostActionsResults(
      {
        insertCustomerAddressSuccess: InsertCustomer.actionSuccess,
        insertCustomerAddressFailure: InsertCustomer.actionFailure,
        updateCustomerAddressSuccess: UpdateCustomer.actionSuccess,
        updateCustomerAddressFailure: UpdateCustomer.actionFailure,
        deleteCustomerAddressSuccess: DeleteCustomer.actionSuccess,
        deleteCustomerAddressFailure: DeleteCustomer.actionFailure,
      },
      {
        insertCustomerAddressSuccess: () => {
          this.displayNotification('Record inserted');
          this.getData();
        },
        insertCustomerAddressFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateCustomerAddressSuccess: () => {
          this.displayNotification('Record updated');
          this.getData();
        },
        updateCustomerAddressFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        deleteCustomerAddressSuccess: () => {
          this.displayNotification('Record deleted');
          this.getData();
        },
        deleteCustomerAddressFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
      },
      this.destroy$
    );
  }
  //#endregion

  ngOnDestroy() {
    WebAppBase.data = undefined;
    this.destroy$.next();
    this.destroy$.complete();
  }
}
