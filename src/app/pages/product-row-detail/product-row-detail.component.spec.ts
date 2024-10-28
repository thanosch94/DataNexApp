import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRowDetailComponent } from './product-row-detail.component';

describe('ProductRowDetailComponent', () => {
  let component: ProductRowDetailComponent;
  let fixture: ComponentFixture<ProductRowDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRowDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductRowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
