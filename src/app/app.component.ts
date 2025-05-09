import { CompaniesViewModel } from './view-models/companies.viewmodel';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ChangeDetectorRef, Component, Injector, ViewChild } from '@angular/core';
import { Router, RouterOutlet, RoutesRecognized } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Guid } from 'guid-typescript';
import { WebAppBase } from './base/web-app-base';
import { MenuItemDto } from './dto/menu-item.dto';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faDoorOpen,
  faFile,
  faHeart,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTabDto } from './dto/app-tab.dto';
import { TabsService } from './services/tabs.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ConfirmComponent } from './pages/components/confirm/confirm.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Navigation } from './base/navigation';
import { DnIconList } from './enumLists/dn-icon.list';
import { SalesReportsComponent } from './pages/sales/sales-reports/sales-reports.component';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatAutocompleteModule,
  MatOptgroup,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  imports: [
    MatIconModule,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    FontAwesomeModule,
    FontAwesomeModule,
    MatTabsModule,
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule,
    SalesReportsComponent,
    MatMiniFabButton,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptgroup,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'DataNexApp';
  sidenavIsOpen: boolean = true;
  tabs: any[];
  isMenuItem?: boolean;
  isAuthenticated: any;
  menuItemsArray = new Array<MenuItemDto>(); // Used to check for tabs
  faFile: any;
  faDoorOpen: any;
  isNavBarItem: boolean | undefined;
  faIcons = DnIconList.icons;
  logoPath: string;
  faCaretDown: any;
  faCaretUp: any;
  selectedMenuItem: Guid;
  appVersion: string;
  apiVersion: string;
  companiesViewModel: CompaniesViewModel;
  loggedInCompanyName: any;
  loggedInUserName: string;
  today: Date;
  selectedSearchItem: string | null;
  searchItems: MenuItemDto[];
  faHeartCirclePlus: any;
  faHeart: any;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private tabsService: TabsService,
    private injector: Injector
  ) {
    //if(isDevMode()){
    //   this.logoPath = "../assets/images/datanex_logo.png"
    // }else{
    this.logoPath = './assets/images/datanex_logo.png';

    // }
    this.faFile = faFile;
    this.faDoorOpen = faDoorOpen;
    this.appVersion = WebAppBase.version;
    this.apiVersion = WebAppBase.apiVersion;
    this.faCaretDown = faCaretDown;
    this.faCaretUp = faCaretUp;
    this.faHeartCirclePlus = faHeartCirclePlus;
    this.faHeart = faHeart;
    this.tabs = tabsService.getTabs();
    router.events.subscribe((result: any) => {
      if (result instanceof RoutesRecognized) {
        if (result.url != '/' && result.url != '/login') {
          this.checkAndAddTab(result);
        }
      }
      this.isAuthenticated = this.auth.isAuthenticated;
      this.loggedInCompanyName = this.auth?.loggedInCompany?.Name;
      this.loggedInUserName = this.auth?.user?.UserName;
      this.today = new Date();
      //this.ref.detectChanges()
    });

    this.getMenuItemsForTabs();
    this.companiesViewModel = new CompaniesViewModel(this.http, this.auth);
  }
  menuItems: MenuItemDto[] = Navigation.menu;
  selectedTab = new FormControl(0);

  getMenuItemsForTabs() {
    this.menuItems.forEach((menuItem) => {
      this.menuItemsArray.push(menuItem);
      if (menuItem.Children) {
        this.menuItemsArray.push(...menuItem.Children);
      }
    });
  }
  onMenuItemClick(item: MenuItemDto) {
    this.redirectToMenuItem(item);
  }

  onSearchItemClick(item: MenuItemDto) {
    this.redirectToMenuItem(item);
    this.selectedSearchItem = '';
    this.searchItems = this.menuItems;
  }

  redirectToMenuItem(item: MenuItemDto) {
    this.isMenuItem = true;
    this.selectedMenuItem = item.Id;
    this.router.navigate([item.Path], { queryParams: item.Params });
  }

  getMenuIcon(menuItem: MenuItemDto) {
    let icon = DnIconList.icons.find((x) => x.Name == menuItem.Icon);
    if (icon) {
      return icon.Icon;
    } else {
      icon = DnIconList.icons.find((x) => x.Name == 'faCircle');
      return icon!.Icon;
    }
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
    if (tab.index >= 0) {
      this.tabs[tab.index].Active = true;
     // this.router.navigate(this.tabs[tab.index].Route, { queryParams: tab.Params });
    } else {
      this.router.navigate(['/']);
      this.isMenuItem = undefined;
    }
  }

  checkAndAddTab(data: RoutesRecognized) {
    let comp = data.state.root.firstChild?.component;

    if (this.isMenuItem || this.isNavBarItem) {
      let tabItem = this.menuItemsArray.find(
        (x: any) =>
          x.Path == data.state.root.firstChild?.routeConfig?.path &&
          x.Id == this.selectedMenuItem
      );
      let tabItemName = tabItem ? tabItem.Name : '';

      this.tabsService.deactivateTabs();
      let tab = new AppTabDto();
      tab.Id = Guid.create();
      if (this.tabs.find((existingTab) => existingTab.Name == tabItemName) == null) {
        const newInjector = Injector.create({
          providers: [{ provide: 'tab', useValue: tab }],

          parent: this.injector,
        });


        tab.Name = tabItemName;
        tab.PrevName = tabItemName;
        tab.Component = class  extends (comp as any) {};;
        tab.Key = tabItemName;
        tab.Active = true;
        tab.Hint = tabItemName;
        tab.Injector = newInjector;
        tab.Params= tabItem?.Params
        tab.OriginId = this.selectedMenuItem;
        tab.Route = data.state.root.firstChild?.routeConfig;
        this.tabs.push(tab);
        this.selectedTab.setValue(this.tabs.length - 1);
      } else {
        let tabToAcivate = this.tabs.find((tab) => tab.Name == tabItemName);
        let index = 0;
        if (tabToAcivate) {
          index = this.tabs.indexOf(tabToAcivate!);
          tabToAcivate.Active = true;
          this.selectedTab.setValue(index);
        }
      }
      this.isMenuItem = false;
      this.isNavBarItem = false;
    } else if (!this.isMenuItem && !this.isNavBarItem) {
      let tab = this.tabs.find((tab) => tab.Active == true);
      if (tab) {
        tab!.Component = comp;
        tab!.Route = data.state.root.firstChild?.routeConfig;
      }
    }
  }

  onTabCloseClicked(e: any, tab: AppTabDto) {
    this.tabsService.closeTab(tab);
    this.selectedTab.setValue(this.tabs.length - 1);
    this.router.navigate(['/']);
  }

  onLogOutBtnClicked(e: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '320px',
      data: {
        Title: 'Message',
        Content: 'Are you sure you want to log out',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.auth.isAuthenticated = false;
        WebAppBase.isLoggedIn = false;
        this.ref.detectChanges();
        window.location.reload();

        this.router.navigate(['login']);
      } else {
      }
    });
  }

  onUserBtnClicked(e: any) {
    this.isNavBarItem = true;
    WebAppBase.data = this.auth.user.Id;
    this.router.navigate(['user-edit']);
  }

  onGearBtnClicked(e: any) {
    //this.isNavBarItem = true;
    //WebAppBase.data = this.auth.user.Id;
    //this.router.navigate(['user-edit']);
  }

  onMenuCaretArrowClicked(e: any, menuItem: MenuItemDto) {
    menuItem.IsOpen = !menuItem.IsOpen;
  }

  filterItems(e: any) {
    let searchValue = e.toLowerCase();
    this.searchItems = this.menuItems
      .map((category: MenuItemDto) => ({
        ...category,
        Children: category.Children!.filter((item) =>
          item.Name.toLowerCase().includes(searchValue)
        ),
      }))
      .filter((category) => category.Children.length > 0); // Remove empty categories
  }

  onAddRemoveToFavoritesMenuItem(e: any, item: any) {
    e.stopPropagation();
    item.IsFavorite = !item.IsFavorite;
  }

  onSideMenuFavoritesBtnClicked(e: any) {
    this.menuItems = Navigation.menu
      .map((item) => {
        const filteredChildren = item.Children
          ? item.Children.filter((child) => child.IsFavorite)
          : [];
        return {
          ...item,
          Children: filteredChildren.length ? filteredChildren : undefined,
        };
      })
      .filter((item) => item.IsFavorite || item.Children?.length);
  }

  onSideMenuBtnClicked(e: any) {
    this.menuItems = Navigation.menu;
  }

  // dropTab(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
  // }

  onTabClicked(e:any, tab:AppTabDto){
    if (e.button === 1) {
      //Close Tab on middle mouse click
      this.tabsService.closeTab(tab);
    }
  }
}
