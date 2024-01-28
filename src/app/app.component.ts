import { MatSidenavModule } from '@angular/material/sidenav';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule,MatListModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DataNexApp';

  menuItems =[
    {Id:1, Name:"Customers"},
    {Id:2, Name:"Orders"},
    {Id:3, Name:"Products"},
    {Id:4, Name:"Users"},
  ]
}
