import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWithFiltersComponent } from './list-with-filters.component';

describe('ListWithFiltersComponent', () => {
  let component: ListWithFiltersComponent;
  let fixture: ComponentFixture<ListWithFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWithFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListWithFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
