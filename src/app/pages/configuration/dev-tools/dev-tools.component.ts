import { Component, signal } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnPopupComponent } from '../../components/dn-popup/dn-popup.component';
import { JsonPipe } from '@angular/common';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DnTextboxComponent } from "../../components/dn-textbox/dn-textbox.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dev-tools',
  imports: [DnToolbarComponent, DnPopupComponent, JsonPipe, MatTabGroup, MatTabsModule, MatIconModule, DnTextboxComponent, MatButtonModule],
  templateUrl: './dev-tools.component.html',
  styleUrl: './dev-tools.component.css'
})
export class DevToolsComponent {
  displayDevToolsPopup = signal<boolean>(false)
  dev_tools_title_text:string = "Dev Tools"
  data = signal<any>(null)


  open(data:any){
    this.data.set( data)
    this.displayDevToolsPopup.set(true)
  }

  close(data:any){
    this.displayDevToolsPopup.set(false)
  }

  refresh(e:any){

  }
}
