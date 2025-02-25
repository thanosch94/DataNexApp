import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'dn-textarea',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './dn-textarea.component.html',
  styleUrl: './dn-textarea.component.css'
})
export class DnTextareaComponent {

}
