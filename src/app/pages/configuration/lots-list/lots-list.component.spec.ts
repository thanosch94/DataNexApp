import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotslistComponent } from './lots-list.component';

describe('LotsComponent', () => {
  let component: LotslistComponent;
  let fixture: ComponentFixture<LotslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
