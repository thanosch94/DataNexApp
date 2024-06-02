import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAdditionalChargesComponent } from './document-additional-charges.component';

describe('DocumentAdditionalChargesComponent', () => {
  let component: DocumentAdditionalChargesComponent;
  let fixture: ComponentFixture<DocumentAdditionalChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentAdditionalChargesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentAdditionalChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
