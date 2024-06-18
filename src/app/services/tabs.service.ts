import { Injectable } from '@angular/core';
import { AppTabDto } from '../dto/app-tab.dto';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  route: any;

  constructor(private activatedRoute: ActivatedRoute) {
    activatedRoute.firstChild?.url.subscribe((result: any) => {
      this.route = result[0].path;
    });
  }
  static tabs = new Array<AppTabDto>();

  getTabs() {
    return TabsService.tabs;
  }

  closeTab(tab: AppTabDto) {
    let tabIndex = TabsService.tabs.indexOf(tab);

    TabsService.tabs.splice(tabIndex, 1);
  }

  setTabName(tabName: string) {
    debugger
    let activeTab = TabsService.tabs.find(
      (x: AppTabDto) => x.Route.path == this.route && x.Name == ''
    );
    if (activeTab) {
      if (activeTab!.Name == '') {
        activeTab!.Name = tabName.substring(0, 15);
      }
    }
  }

  setTabNameByOldName(tabName: string, oldName:string) {
    //Finds the tab using the previous name
    let activeTab = TabsService.tabs.find(
      (x: AppTabDto) => x.Route.path == this.route && x.Name == oldName.substring(0, 15)
    );
    if (activeTab) {
        activeTab!.Name = tabName.substring(0, 15);

    }
  }

  deactivateTabs() {
    TabsService.tabs.forEach((tab) => {
      tab.Active = false;
    });
  }
}
