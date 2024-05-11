import { MatDialog } from '@angular/material/dialog';
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
import {  faCaretDown, faCaretUp, faDoorOpen, faFile, faGear, faHome } from '@fortawesome/free-solid-svg-icons';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { AppTabDto } from './dto/app-tab.dto';
import { TabsService } from './services/tabs.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ConfirmComponent } from './pages/components/confirm/confirm.component';

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
    HttpClientModule
  ],
  providers:[AuthService, HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'DataNexApp';
  sidenavIsOpen: boolean = true;
  tabs:any[];
  isMenuItem?: boolean;
  isAuthenticated: any;
  faHome: any;
  faGear: any;
  faFile: any;
  faDoorOpen: any;
  isNavBarItem: boolean | undefined;

  isMenuOpen: boolean= true;
  isSettingsMenuOpen: boolean = false;
  isExtraMenuOpen: boolean = false;
  faMenuCaret: any;
  faSettingsMenuCaret: any;
  faExtraMenuCaret: any;
  constructor(private auth:AuthService, private router: Router, private dialog:MatDialog, private ref: ChangeDetectorRef, private tabsService:TabsService) {

    this.faHome = faHome;
    this.faGear = faGear;
    this.faFile = faFile;
    this.faDoorOpen = faDoorOpen;
    this.faMenuCaret = faCaretUp;
    this.faExtraMenuCaret = faCaretDown;
    this.faSettingsMenuCaret = faCaretDown
    this.tabs = tabsService.getTabs()
    router.events.subscribe((result: any) => {
      if (result instanceof RoutesRecognized) {
        debugger
        if(result.url!="/"){
          this.checkAndAddTab(result);
        }

      }
      this.isAuthenticated = this.auth.isAuthenticated
      //this.ref.detectChanges()

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
    if (this.isMenuItem || this.isNavBarItem) {
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
      this.isNavBarItem =false

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
      this.router.navigate(["/"])
    }

  onLogOutBtnClicked(e:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '320px',
      data: {
        Title: 'Message',
        Content: 'Are you sure you want to log out'
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.auth.isAuthenticated = false;
        WebAppBase.isLoggedIn =false;
        this.ref.detectChanges();
        this.router.navigate(['login']);
      } else {
      }
    });

  }

  onUserBtnClicked(e:any){
    debugger
    this.isNavBarItem = true;
    WebAppBase.data = this.auth.user.Id;
    this.router.navigate(['user-edit']);
  }

  onSettingsCaretArrowClicked(e:any){
    if(this.faSettingsMenuCaret==faCaretDown){
      this.faSettingsMenuCaret = faCaretUp

    }else{
      this.faSettingsMenuCaret = faCaretDown
    }
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen
  }

  onMenuCaretArrowClicked(e:any){
    if(this.faMenuCaret==faCaretDown){
      this.faMenuCaret = faCaretUp
    }else{
      this.faMenuCaret = faCaretDown
    }
    this.isMenuOpen = !this.isMenuOpen
  }

  onExtraMenuCaretArrowClicked(e:any){
    if(this.faExtraMenuCaret==faCaretDown){
      this.faExtraMenuCaret = faCaretUp
    }else{
      this.faExtraMenuCaret = faCaretDown
    }
    this.isExtraMenuOpen = !this.isExtraMenuOpen
  }
}
