import {
  Component,
  Input,
  output,
  input,
  ChangeDetectorRef,
  effect,
  ViewChild,
  ElementRef,
  AfterViewInit,
  QueryList,
  ViewChildren,
  AfterViewChecked,
  NgZone,
} from '@angular/core';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../services/auth.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'dn-kanban',
  imports: [
    CdkDrag,
    CdkDropList,
    CommonModule,
    CdkDropListGroup,
    FaIconComponent,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './dn-kanban.component.html',
  styleUrl: './dn-kanban.component.css',
})
export class DnKanbanComponent extends BaseComponent implements AfterViewInit {
  columns = input<any[]>();
  @Input() itemColumnId: string;

  private _items: any[];
  userInitials: string;
  isOverflowing: boolean;
  public get items(): any[] {
    return this._items;
  }
  @Input('items')
  public set items(v: any[]) {
    this._items = v;
    this.updateColumnItemsMap();
  }
  @ViewChildren('itemTitle') itemTitles!: QueryList<
    ElementRef<HTMLSpanElement>
  >;
  @ViewChildren('itemDescr') itemDescrs!: QueryList<
    ElementRef<HTMLSpanElement>
  >;

  textOverflowMap: { [id: string]: boolean } = {};
  descrOverflowMap: { [id: string]: boolean } = {};

  @Input() columnTitleBackgroundColor: string = '#0b6aa5';
  @Input() columnTitleColor: string = '#fafafa';
  itemDescriptionExpr = input<string>('');
  titleExpr = input<string>('');
  colorField = input<string>('Priority');
  onItemEditBtnClicked = output();
  onItemDeleteBtnClicked = output();
  itemsChange = output<any>();
  onItemDrop = output<any>();
  columnItemsMap: { [columnId: string]: any[] } = {};

  onItemClicked = output();
  faEdit = faEdit;
  faTrash = faTrash;
  constructor(
    private ref: ChangeDetectorRef,
    private auth: AuthService,
    private ngZone: NgZone
  ) {
    super()
    this.getUserInitials();
    effect(() => {
      if (this.columns()) {
        this.updateColumnItemsMap();
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ngZone.onStable.subscribe(() => {
        this.checkTitleOverflow();
        this.checkDescrOverflow();
      });
    }, 1000);
  }
  checkTitleOverflow() {
    this.itemTitles.toArray().forEach((elRef) => {
      const el = elRef.nativeElement;
      this.textOverflowMap[el.id] = el.scrollWidth > el.clientWidth;
    });
  }

  isTitleOverflowing(id: string): boolean {
    return this.textOverflowMap[id] ?? false;
  }

  checkDescrOverflow() {
    this.itemDescrs.forEach((elRef) => {
      const el = elRef.nativeElement;

      const computedStyle = window.getComputedStyle(el);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const maxLines = 2;
      const maxHeight = lineHeight * maxLines;

      const isOverflowing = el.scrollHeight > maxHeight;

      this.descrOverflowMap[el.id] = isOverflowing;
    });
  }

  isDescrOverflowing(id: string): boolean {
    return this.descrOverflowMap[id] ?? false;
  }

  filterItems(column: any) {
    const data = this.items
      .filter((x: any) => x[this.itemColumnId] == column.Id)
      .map((item, i) => ({
        ...item,
        Order: i,
      }));

    return data ?? [];
  }

  drop(event: CdkDragDrop<any[]>) {
    const movedItemId = event.item.data.Id;
    const movedItem = this.items.find((item) => item.Id === movedItemId);

    const updatedItem = { ...movedItem, StatusId: event.container.id };
    this.items = this.items.map((item) =>
      item.Id == movedItem.Id ? updatedItem : item
    );

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

    this.updateColumnItemsMap();
    let dataToEmit = { newValue: updatedItem };
    this.onItemDrop.emit(dataToEmit);
  }

  updateColumnItemsMap() {
    this.columnItemsMap = {};

    for (let col of this.columns()!) {
      this.columnItemsMap[col.Id] = this.items.filter(
        (item) => item[this.itemColumnId] == col.Id
      );
    }

    this._items = Object.values(this.columnItemsMap).flat();
  }

  onItemClick(item: any) {
    this.onItemClicked.emit(item);
  }

  onItemEditBtnClick(item: any) {
    this.onItemEditBtnClicked.emit(item);
  }

  onItemDeleteBtnClick(item: any) {
    this.onItemDeleteBtnClicked.emit(item);
  }


  getUserInitials() {
    this.userInitials = this.auth.user.Name.split(' ')
      .map((x) => x[0])
      .join('')
      .toUpperCase();
  }
}
