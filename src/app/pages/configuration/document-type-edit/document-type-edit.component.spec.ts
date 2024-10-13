import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeEditComponent } from './document-type-edit.component';

describe('DocumentTypeEditComponent', () => {
  let component: DocumentTypeEditComponent;
  let fixture: ComponentFixture<DocumentTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentTypeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
