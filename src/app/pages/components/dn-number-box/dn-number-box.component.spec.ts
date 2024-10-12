import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnNumberBoxComponent } from './dn-number-box.component';

describe('DnNumberBoxComponent', () => {
  let component: DnNumberBoxComponent;
  let fixture: ComponentFixture<DnNumberBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnNumberBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnNumberBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
