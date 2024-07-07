import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalChargesListComponent } from './additional-charges-list.component';

describe('AdditionalChargesComponent', () => {
  let component: AdditionalChargesListComponent;
  let fixture: ComponentFixture<AdditionalChargesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalChargesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalChargesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
