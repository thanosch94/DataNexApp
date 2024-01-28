import { MatSidenavModule } from '@angular/material/sidenav';
import { Component, NgModule } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Guid } from 'guid-typescript';
import { WebAppBase } from './base/web-app-base';
import { MenuItemDto } from './dto/menu-item.dto';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule,MatListModule, CommonModule,FontAwesomeModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'DataNexApp';
  faArrowLeft: any;

  constructor(private router:Router){
    this.faArrowLeft=faArrowLeft
  }
  menuItems:MenuItemDto[] =WebAppBase.menu


  onMenuItemClick(item:MenuItemDto){
    debugger
  this.router.navigate([item.Path])
  }

}
