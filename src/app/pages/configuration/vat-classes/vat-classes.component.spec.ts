import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatClassesComponent } from './vat-classes.component';

describe('VatClassesComponent', () => {
  let component: VatClassesComponent;
  let fixture: ComponentFixture<VatClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VatClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VatClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
