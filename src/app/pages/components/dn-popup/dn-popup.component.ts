import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'dn-popup',
  imports: [CommonModule],
  templateUrl: './dn-popup.component.html',
  styleUrl: './dn-popup.component.css',
})
export class DnPopupComponent {
  isReady: boolean;
  data = input<any[]>();
  title = input<string>();
  width = input<string>('600px');
  height = input<string>('600px');
  isFullScreen = input<boolean>(false);
  hideOnOutsideClick = input<boolean>();
  onHiding = output();
  isPopupVisible= input<boolean>(false);

  constructor(private elementRef: ElementRef) {
    setTimeout(()=>{
      this.isReady=true
    },10)
  }


  hidePopup() {
    this.onHiding.emit();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.querySelector('.popup').contains(event.target) && this.isReady && this.hideOnOutsideClick()) {
      this.hidePopup();
    }
  }

}
