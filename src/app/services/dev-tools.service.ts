import { DevToolsComponent } from './../pages/configuration/dev-tools/dev-tools.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevToolsService {
  private devTools!: DevToolsComponent;

  constructor() { }

  register(devTools: DevToolsComponent) {
    this.devTools = devTools;
  }

  open(data: any) {
    this.devTools.open(data);
  }

  close(data:any) {
    this.devTools.close(data);
  }

}
