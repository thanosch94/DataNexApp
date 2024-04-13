import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnAlertComponent } from './dn-alert.component';

describe('DnAlertComponent', () => {
  let component: DnAlertComponent;
  let fixture: ComponentFixture<DnAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
