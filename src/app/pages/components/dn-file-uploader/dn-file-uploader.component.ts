import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { DragAndDropDirective, FileHandle } from '../../../directives/drag-and-drop.directive';
import { CommonModule } from '@angular/common';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dn-file-uploader',
  imports: [CommonModule,DragAndDropDirective, MatButtonModule],
  templateUrl: './dn-file-uploader.component.html',
  styleUrl: './dn-file-uploader.component.css'
})
export class DnFileUploaderComponent {
  name = 'Angular 5';
  files: FileHandle[] = [];
  faFileCirclePlus =faFileCirclePlus
  filesDropped(files: any): void {
    debugger
    this.files = files;
  }

  upload(): void {
    //get image upload file obj;
  }
}
