import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File,
  url: SafeUrl
}

@Directive({
  selector: '[dragAndDrop]'
})
export class DragAndDropDirective {

  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();

  @HostBinding("style.background") private background = "#eee";
  @HostBinding("style.transition") private transition = "background 0.3s ease-in-out";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"]) public onDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.background = "#eee";

  }

  @HostListener('drop', ['$event']) public onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#eee';

    let files: FileHandle[] = [];
    if(e.dataTransfer){

    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const file = e.dataTransfer.files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push({ file, url });
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
}
