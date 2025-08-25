import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPermissionsComponent } from './app-permissions.component';

describe('AppPermissionsComponent', () => {
  let component: AppPermissionsComponent;
  let fixture: ComponentFixture<AppPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
