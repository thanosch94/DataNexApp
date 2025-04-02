import { Component, Input } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dn-kanban',
  imports: [CdkDrag, CdkDropList, CommonModule, CdkDropListGroup, FaIconComponent, MatButtonModule],
  templateUrl: './dn-kanban.component.html',
  styleUrl: './dn-kanban.component.css',
})
export class DnKanbanComponent {
  @Input() columns: any[];
  @Input() itemColumnId: string;
  @Input() items: any[];
  @Input() columnTitleBackgroundColor: string ="#0b6aa5";
  @Input() columnTitleColor: string="#fafafa";

  faEdit=faEdit
  faTrash=faTrash
  constructor() {

  }

  getColumns() {
    if (this.columns) {
      for (let i = 0; i < this.columns.length; i++) {
        Object.defineProperty(this.columns[i], 'Order', {
          value: i,
          writable: true,
          enumerable: true,
        });
      }
    } else {
      this.columns = [];
    }
    return this.columns;
  }

  filterItems(column: any) {
    let data = this.items.filter((x: any) => x[this.itemColumnId] == column.Id);
    for (let i = 0; i < data.length; i++) {
      Object.defineProperty(data[i], 'Order', {
        value: i,
        writable: true,
        enumerable: true,
      });
    }
    if (data) {
      return data;
    } else {
      return [];
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    const movedItem = event.item.data;

    let newColumn = Number(event.container.id.replace('cdk-drop-list-', ''));
    const newColumnId = newColumn;

    // Check if the item was dropped into a different column and update Column
    let index = this.items.indexOf(movedItem);

    this.items[index][this.itemColumnId] = newColumnId + 1;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    //Update Item Order
    let currentItem = event.container.data.find(
      (x) => x.Id == event.item.data.Id
    );
    currentItem!.Order = event.currentIndex;

    for (let i = 0; i < event.container.data.length; i++) {
      let item = this.items.find((x) => x.Id == event.container.data[i].Id);
      let index = this.items.indexOf(item!);

      if (
        event.container.data[i].Order == event.currentIndex &&
        event.container.data[i].Id == event.item.data.Id
      ) {
        continue;
      } else if (event.container.data[i].Order <= event.currentIndex) {
        this.items[index].Order = i;
      }
    }
    //Sort Items based on the Order Property
    this.items.sort((a, b) => a.Order - b.Order);
  }
}
