import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnDateBoxComponent } from './dn-date-box.component';

describe('DnDateBoxComponent', () => {
  let component: DnDateBoxComponent;
  let fixture: ComponentFixture<DnDateBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnDateBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnDateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
