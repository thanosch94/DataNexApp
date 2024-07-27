import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnSelectboxComponent } from './dn-selectbox.component';

describe('DnSelectboxComponent', () => {
  let component: DnSelectboxComponent;
  let fixture: ComponentFixture<DnSelectboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnSelectboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnSelectboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
