import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-confirm',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './delete-confirm.component.html',
    styleUrl: './delete-confirm.component.css'
})
export class DeleteConfirmComponent {

}
