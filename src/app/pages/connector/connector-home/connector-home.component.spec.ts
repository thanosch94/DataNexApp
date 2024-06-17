import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorHomeComponent } from './connector-home.component';

describe('ConnectorHomeComponent', () => {
  let component: ConnectorHomeComponent;
  let fixture: ComponentFixture<ConnectorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectorHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
