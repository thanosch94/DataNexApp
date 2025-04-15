import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemTypesListComponent } from './work-item-types-list.component';

describe('WorkItemTypesListComponent', () => {
  let component: WorkItemTypesListComponent;
  let fixture: ComponentFixture<WorkItemTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkItemTypesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
