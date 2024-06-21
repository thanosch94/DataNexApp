import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorDatasourcesOptionsComponent } from './connector-datasources-options.component';

describe('ConnectorDatasourcesOptionsComponent', () => {
  let component: ConnectorDatasourcesOptionsComponent;
  let fixture: ComponentFixture<ConnectorDatasourcesOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectorDatasourcesOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectorDatasourcesOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
