import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSizesListComponent } from './product-sizes-list.component';

describe('ProductSizesListComponent', () => {
  let component: ProductSizesListComponent;
  let fixture: ComponentFixture<ProductSizesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSizesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSizesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
