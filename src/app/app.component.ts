import { CompaniesViewModel } from './view-models/companies.viewmodel';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  HostListener,
  Injector,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { Router, RouterOutlet, RoutesRecognized } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule, NgComponentOutlet } from '@angular/common';
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
import { DevToolsComponent } from './pages/configuration/dev-tools/dev-tools.component';
import { DevToolsService } from './services/dev-tools.service';
import { debug } from 'console';

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
    DevToolsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewChecked {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild(DevToolsComponent) devTools!: DevToolsComponent;
  @ViewChild(NgComponentOutlet) ng = signal<NgComponentOutlet | null>(null);
  @ViewChildren('container', { read: ViewContainerRef })
  containers!: QueryList<ViewContainerRef>;

  componentRefs: ComponentRef<any>[] = [];

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
  selectedTabIndex: any;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private tabsService: TabsService,
    private injector: Injector,
    private devToolsService: DevToolsService,
    private resolver: ComponentFactoryResolver
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

    this.getMenuItemsForTabs();
    this.companiesViewModel = new CompaniesViewModel(this.http, this.auth);
  }
  menuItems: MenuItemDto[] = Navigation.menu;
  selectedTab = new FormControl(0);

  ngAfterViewInit() {
    this.router.events.subscribe((result: any) => {
      if (result instanceof RoutesRecognized) {
        if (result.url != '/' && result.url != '/login') {
          debugger;
          this.checkAndAddTab(result);
        }
      }
      this.isAuthenticated = this.auth.isAuthenticated;
      this.loggedInCompanyName = this.auth?.loggedInCompany?.Name;
      this.loggedInUserName = this.auth?.user?.UserName;
      this.today = new Date();
      //this.ref.detectChanges()
    });
  }
  ngAfterViewChecked(): void {
    this.devToolsService.register(this.devTools);
  }
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
  onTabChanged(tab: any, index: any) {
    debugger;
    this.tabsService.deactivateTabs();
    this.selectedTabIndex = index;

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
      debugger;
      if (
        this.tabs.find((existingTab) => existingTab.Name == tabItemName) == null
      ) {
        tab.Name = tabItemName;
        tab.PrevName = tabItemName;
        tab.Component = class extends (comp as any) {};
        //tab.Component = comp;
        tab.Key = tabItemName;
        tab.Active = true;
        tab.Hint = tabItemName;
        tab.Params = tabItem?.Params;
        tab.OriginId = this.selectedMenuItem;
        tab.Route = data.state.root.firstChild?.routeConfig;
        const newInjector = Injector.create({
          providers: [{ provide: 'tab', useValue: tab }],

          parent: this.injector,
        });
        tab.Injector = newInjector;

        this.tabs.push(tab);
        this.devToolsService.register(this.devTools);

        this.selectedTab.setValue(this.tabs.length - 1);

        let index = this.tabs.length - 1;
        setTimeout(() => {
          this.containers.get(index)!.clear(); // Clear previous component

          const factory = this.resolver.resolveComponentFactory(tab.Component);
          const ref = this.containers
            .get(index)!
            .createComponent(factory, undefined, tab.Injector);
          this.componentRefs.push(ref);
        }, 200);
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

      let index = this.tabs.indexOf(tab!);

      if (tab) {
        tab!.Component = comp;
        tab!.Route = data.state.root.firstChild?.routeConfig;
        setTimeout(() => {
          this.containers.get(index)!.clear(); // Clear previous component
          this.componentRefs.splice(index, 1);

          const factory = this.resolver.resolveComponentFactory(tab.Component);
          const ref = this.containers
            .get(index)!
            .createComponent(factory, undefined, tab.Injector);
          this.componentRefs.push(ref);
        }, 0);
      }
    }
  }

  onTabCloseClicked(e: any, tab: AppTabDto) {
    let index = this.tabs.indexOf(tab);
    this.componentRefs.splice(index, 1);
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

  onTabClicked(e: any, tab: AppTabDto) {
    if (e.button === 1) {
      //Close Tab on middle mouse click
      this.tabsService.closeTab(tab);
    }
  }

  @HostListener('window:keydown.control.alt.d', ['$event'])
  async onKeyDown(e: KeyboardEvent) {
    //TODO Add check if user role is admin
    let nested =
      this.componentRefs[this.selectedTabIndex].instance?.nested?.toArray();
    this.devToolsService.open(
      await this.componentRefs[this.selectedTabIndex].instance?.getExportedData(
        nested
      )
    );
  }
}
