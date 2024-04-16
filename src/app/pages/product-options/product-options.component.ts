import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'product-options',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './product-options.component.html',
  styleUrl: './product-options.component.css'
})
export class ProductOptionsComponent {
  faInfo: any;
  faGear: any;
  faList: any;
  faRectangleList: any;
  constructor(){
    this.faInfo = faInfo
    this.faGear = faGear
    this.faList = faList
    this.faRectangleList = faRectangleList
  }
}
