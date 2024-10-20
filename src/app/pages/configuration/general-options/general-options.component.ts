import { GeneralOptionsViewModel } from './../../../view-models/general-options.viewmodel';
import { Component } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { GeneralOptionsDto } from '../../../dto/configuration/general-options.dto';
import { DnCheckboxComponent } from '../../components/dn-checkbox/dn-checkbox.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-general-options',
  standalone: true,
  imports: [DnToolbarComponent, DnCheckboxComponent],
  templateUrl: './general-options.component.html',
  styleUrl: './general-options.component.css',
})
export class GeneralOptionsComponent {
  general_options_text: string = "General Options";
  generalOptionsViewModel: GeneralOptionsViewModel;
  generalOptions: GeneralOptionsDto = new GeneralOptionsDto();

  constructor(private http: HttpClient, private auth: AuthService, private _snackBar:MatSnackBar) {
    this.generalOptionsViewModel = new GeneralOptionsViewModel(
      this.http,
      this.auth
    );
    //General options is a single line of data in the database which is unique for each company
    //The first time someone accessing general options component if there are no options for the company
    ///we create them
    this.getOrInsertGeneralOptions();
  }

  getOrInsertGeneralOptions() {
    this.generalOptionsViewModel
      .GetAll()
      .subscribe((result: GeneralOptionsDto) => {
        next: {
          if (result) {
            this.generalOptions = result;
          } else {
            this.generalOptionsViewModel
              .InsertDto(this.generalOptions)
              .subscribe((result: GeneralOptionsDto) => {
                next: {
                  this.generalOptions = result;
                }
                error: {
                  console.log('Something went wrong inserting generalOptions');
                }
              });
          }
        }
      });
  }

  onSaveClicked(e: any) {
    this.generalOptionsViewModel
      .UpdateDto(this.generalOptions)
      .subscribe((result: GeneralOptionsDto) => {
        next: {
          this.displayNotification("Record updated")
          this.generalOptions = result;
        }
      });
  }
  onRefreshClicked(e:any){
    this.getOrInsertGeneralOptions()
  }

  displayNotification(text: string) {
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
  }

}
