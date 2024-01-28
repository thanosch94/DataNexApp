import { MatSidenavModule } from '@angular/material/sidenav';
import { Component } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Guid } from 'guid-typescript';
import { WebAppBase } from './base/web-app-base';
import { CustomersModule } from './customers/customers.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule,MatListModule, CommonModule,CustomersModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DataNexApp';

  constructor(private router:Router){

  }
  menuItems =WebAppBase.menu


  onMenuItemClick(id:Guid){
  this.router.navigate(["customer-edit"])
  }
}
