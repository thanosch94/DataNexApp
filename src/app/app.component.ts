import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Component, NgModule, ViewChild } from '@angular/core';
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
  imports: [MatIconModule, RouterOutlet, MatSidenavModule,MatListModule, CommonModule,FontAwesomeModule, FontAwesomeModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  @ViewChild('sidenav') sidenav:MatSidenav
  title = 'DataNexApp';
  faArrowLeft: any;
  sidenavIsOpen: boolean=true;

  constructor(private router:Router){
    this.faArrowLeft=faArrowLeft
  }
  menuItems:MenuItemDto[] =WebAppBase.menu
  settingsItems:MenuItemDto[] = WebAppBase.settingsMenu
  extraItems:MenuItemDto[] = WebAppBase.extraMenu

  onMenuItemClick(item:MenuItemDto){
  this.router.navigate([item.Path])
  }

  onSettingsItemClick(item:MenuItemDto){
  this.router.navigate([item.Path])
  }

  onExtraItemClick(item:MenuItemDto){
    this.router.navigate([item.Path])
  }

  onMenuBtnClicked(){
    if(this.sidenavIsOpen){
      this.sidenav.close()
      this.sidenavIsOpen = false
    }else{
      this.sidenav.open()
        this.sidenavIsOpen = true
    }

  }
}
