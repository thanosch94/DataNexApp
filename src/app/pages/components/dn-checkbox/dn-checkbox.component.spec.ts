import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnCheckboxComponent } from './dn-checkbox.component';

describe('DnCheckboxComponent', () => {
  let component: DnCheckboxComponent;
  let fixture: ComponentFixture<DnCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
