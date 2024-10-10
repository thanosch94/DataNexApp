import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersLedgerComponent } from './customers-ledger.component';

describe('CustomersLedgerComponent', () => {
  let component: CustomersLedgerComponent;
  let fixture: ComponentFixture<CustomersLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersLedgerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
