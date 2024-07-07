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

  getActiveTab(){
    let tab = TabsService.tabs.find(x=>x.Active==true)
    return tab
  }

  closeTab(tab: AppTabDto) {
    let tabIndex = TabsService.tabs.indexOf(tab);

    TabsService.tabs.splice(tabIndex, 1);
  }

  setActiveTabPreviousName(){
    let activeTab = TabsService.tabs.find(
      (x: AppTabDto) =>x.Active ==true
    );
    if (activeTab) {
      let activeTabPrevName = activeTab.Name
        activeTab.Name = activeTab.PrevName
        activeTab!.Hint = activeTab.PrevName;
        activeTab!.Name = activeTab.PrevName.substring(0, 15);
        activeTab.PrevName = activeTabPrevName
    }
  }
  setActiveTabName(tabName: string){
    let activeTab = TabsService.tabs.find(
      (x: AppTabDto) =>x.Active ==true
    );

    if (activeTab) {
        activeTab.PrevName = activeTab.Name
        activeTab!.Hint = tabName;
        activeTab!.Name = tabName.substring(0, 15);

    }
  }

  setActiveTabNameWithoutChangingPreviousName(tabName: string){
    let activeTab = TabsService.tabs.find(
      (x: AppTabDto) =>x.Active ==true
    );

    if (activeTab) {
        activeTab!.Hint = tabName;
        activeTab!.Name = tabName.substring(0, 15);

    }
  }

  setTabName(tabName: string) {
    let activeTab = TabsService.tabs.find(
      (x: AppTabDto) => x.Route.path == this.route && x.Active ==true
    );

    if (activeTab) {
        activeTab.PrevName = activeTab.Name
        activeTab!.Hint = tabName;
        activeTab!.Name = tabName.substring(0, 15);

    }
  }

  setTabsData(data:Array<Object>){

    let activeTab = TabsService.tabs.find(
      (x: AppTabDto) => x.Route.path == this.route && x.Active ==true
    );
    if(activeTab){
      activeTab.Data = data
    }
  }

  setTabNameByOldName(tabName: string, oldName: string) {
    debugger

    //Finds the tab using the previous name
    let activeTab = TabsService.tabs.find(
      (x: AppTabDto) =>
        x.Route.path == this.route && x.Name == oldName.substring(0, 15)
    );
    debugger

    if (activeTab) {
      activeTab.PrevName = activeTab.Name

      activeTab!.Hint = tabName;
      activeTab!.Name = tabName.substring(0, 15);
    }
  }

  deactivateTabs() {
    TabsService.tabs.forEach((tab) => {
      tab.Active = false;
    });
  }
}
