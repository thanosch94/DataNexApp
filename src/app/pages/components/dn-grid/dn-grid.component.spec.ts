import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnGridComponent } from './dn-grid.component';

describe('DnGridComponent', () => {
  let component: DnGridComponent;
  let fixture: ComponentFixture<DnGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
