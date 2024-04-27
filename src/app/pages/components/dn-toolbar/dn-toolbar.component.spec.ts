import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnToolbarComponent } from './dn-toolbar.component';

describe('DnToolbarComponent', () => {
  let component: DnToolbarComponent;
  let fixture: ComponentFixture<DnToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
