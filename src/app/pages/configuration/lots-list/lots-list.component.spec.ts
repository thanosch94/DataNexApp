import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsListComponent } from './lots-list.component';

describe('LotsComponent', () => {
  let component: LotsListComponent;
  let fixture: ComponentFixture<LotsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
