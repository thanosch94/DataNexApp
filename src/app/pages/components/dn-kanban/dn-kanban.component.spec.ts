import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnKanbanComponent } from './dn-kanban.component';

describe('DnKanbanComponent', () => {
  let component: DnKanbanComponent;
  let fixture: ComponentFixture<DnKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnKanbanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DnKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
