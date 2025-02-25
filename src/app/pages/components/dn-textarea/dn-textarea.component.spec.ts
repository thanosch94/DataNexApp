import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnTextareaComponent } from './dn-textarea.component';

describe('DnTextareaComponent', () => {
  let component: DnTextareaComponent;
  let fixture: ComponentFixture<DnTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DnTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
