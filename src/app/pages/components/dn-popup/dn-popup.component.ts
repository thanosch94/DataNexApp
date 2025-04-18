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
  @Input() isPopupVisible: boolean;

  width = input<string>('600px');
  height = input<string>('600px');
  isFullScreen = input<boolean>(false);
  onHiding = output();
  hideOnOutsideClick = input<boolean>();

  constructor(private elementRef: ElementRef) {
    setTimeout(()=>{
      this.isReady=true
    },10)
  }

  displayPopup() {
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
    this.onHiding.emit();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.querySelector('.popup').contains(event.target) && this.isReady && this.hideOnOutsideClick()) {
      this.hidePopup();
    }
  }

}
