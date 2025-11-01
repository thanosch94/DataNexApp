import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatClassesListComponent } from './vat-classes-list.component';

describe('VatClassesComponent', () => {
  let component: VatClassesListComponent;
  let fixture: ComponentFixture<VatClassesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VatClassesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VatClassesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
