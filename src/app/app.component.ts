import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import {
  ChangeDetectorRef,
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import { Route, Router, RouterOutlet, RoutesRecognized } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Guid } from 'guid-typescript';
import { WebAppBase } from './base/web-app-base';
import { MenuItemDto } from './dto/menu-item.dto';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { AppTabDto } from './dto/app-tab.dto';
import { TabsService } from './services/tabs.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatIconModule,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    FontAwesomeModule,
    FontAwesomeModule,
    MatTabsModule,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'DataNexApp';
  faArrowLeft: any;
  sidenavIsOpen: boolean = true;
  tabs:any[];
  isMenuItem?: boolean;
  constructor(private router: Router, private ref: ChangeDetectorRef, private tabsService:TabsService) {
    this.faArrowLeft = faArrowLeft;
    this.tabs = tabsService.getTabs()
    router.events.subscribe((result: any) => {
      if (result instanceof RoutesRecognized) {
        this.checkAndAddTab(result);
      }
    });
  }
  menuItems: MenuItemDto[] = WebAppBase.menu;
  settingsItems: MenuItemDto[] = WebAppBase.settingsMenu;
  extraItems: MenuItemDto[] = WebAppBase.extraMenu;
  selectedTab = new FormControl(0);


  onMenuItemClick(item: MenuItemDto) {
    this.isMenuItem = true;
    this.router.navigate([item.Path]);
  }

  onSettingsItemClick(item: MenuItemDto) {
    this.isMenuItem = true;
    this.router.navigate([item.Path]);
  }

  onExtraItemClick(item: MenuItemDto) {
    this.isMenuItem = true;
    this.router.navigate([item.Path]);
  }

  onMenuBtnClicked() {
    if (this.sidenavIsOpen) {
      this.sidenav.close();
      this.sidenavIsOpen = false;
    } else {
      this.sidenav.open();
      this.sidenavIsOpen = true;
    }
  }
  onTabChanged(tab: any) {
    this.tabsService.deactivateTabs();
    if(tab.index>=0){
    this.tabs[tab.index].Active = true;
    //this.router.navigate([this.tabs[tab.index].Route.path]);
  }else{
    this.router.navigate(["/"]);
    this.isMenuItem = undefined;
  }
  }

  checkAndAddTab(data: RoutesRecognized) {
    let comp = data.state.root.firstChild?.component;
    let webAppBase=WebAppBase;
    let tabItem = [...webAppBase.menu, ... webAppBase.extraMenu, ...webAppBase.settingsMenu].find(x=>x.Path ==data.state.root.firstChild?.routeConfig?.path);
    let tabItemName = tabItem?tabItem.Name:"";
    if (this.isMenuItem) {
      this.tabsService.deactivateTabs();
      if (this.tabs.find((tab) => tab.Name == tabItemName) == null) {
        let tab = new AppTabDto();
        tab.Id = Guid.create();
        tab.Name = tabItemName;
        tab.Component = comp;
        tab.Key = tabItemName;
        tab.Active = true;
        tab.Route = data.state.root.firstChild?.routeConfig;
        this.tabs.push(tab);
        this.selectedTab.setValue(this.tabs.length - 1);
      } else {
        let tabToAcivate = this.tabs.find((tab) => tab.Name == tabItemName);
        let index = 0;

        if (tabToAcivate) {
          index= this.tabs.indexOf(tabToAcivate!);
          tabToAcivate.Active = true;
          this.selectedTab.setValue(index);

        }
      }
      this.isMenuItem = false;
    } else if (this.isMenuItem == false) {
      let tab = this.tabs.find((tab) => tab.Active == true);
      tab!.Name = tabItemName;
      tab!.Component = comp;
      tab!.Key = tabItemName;
      tab!.Route = data.state.root.firstChild?.routeConfig;
    } else {
    }
    //this.ref.markForCheck();
  }

  onTabCloseClicked(e: any, tab: AppTabDto) {
    this.tabsService.closeTab(tab)
    this.selectedTab.setValue(this.tabs.length - 1);
   // this.ref.detectChanges();
  }
}
