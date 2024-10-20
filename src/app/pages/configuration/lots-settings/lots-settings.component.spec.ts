import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsSettingsComponent } from './lots-settings.component';

describe('LotsSettingsComponent', () => {
  let component: LotsSettingsComponent;
  let fixture: ComponentFixture<LotsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotsSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LotsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
