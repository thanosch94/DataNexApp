import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorParametersComponent } from './connector-parameters.component';

describe('ConnectorParametersComponent', () => {
  let component: ConnectorParametersComponent;
  let fixture: ComponentFixture<ConnectorParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectorParametersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectorParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
