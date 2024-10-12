import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnTextboxComponent } from './dn-textbox.component';

describe('DnTextboxComponent', () => {
  let component: DnTextboxComponent;
  let fixture: ComponentFixture<DnTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnTextboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
