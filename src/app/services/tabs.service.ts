import { Injectable } from '@angular/core';
import { AppTabDto } from '../dto/app-tab.dto';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

constructor() { }
static tabs = new Array<AppTabDto>();

closeTab(tab:AppTabDto){
  let tabIndex = TabsService.tabs.indexOf(tab);

  TabsService.tabs.splice(tabIndex, 1);
}
setTabName(route: string, tabName: string) {
  let activeTab = TabsService.tabs.find(
    (x: AppTabDto) => x.Route.path == route && x.Name == ''
  );

  if (activeTab!.Name == '') {
    activeTab!.Name = tabName;
  }
}

deactivateTabs() {
  TabsService.tabs.forEach((tab) => {
    tab.Active = false;
  });
}

getTabs() {
  return TabsService.tabs;
}
}
