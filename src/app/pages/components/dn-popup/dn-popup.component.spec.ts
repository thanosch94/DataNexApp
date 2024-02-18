import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnPopupComponent } from './dn-popup.component';

describe('DnPopupComponent', () => {
  let component: DnPopupComponent;
  let fixture: ComponentFixture<DnPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
