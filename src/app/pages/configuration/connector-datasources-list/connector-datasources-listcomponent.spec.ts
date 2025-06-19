import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorDatasourcesListComponent } from './connector-datasources-list.component';

describe('ConnectorDatasourcesComponent', () => {
  let component: ConnectorDatasourcesListComponent;
  let fixture: ComponentFixture<ConnectorDatasourcesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectorDatasourcesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectorDatasourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
