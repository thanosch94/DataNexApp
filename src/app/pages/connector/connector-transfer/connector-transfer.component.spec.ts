import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorTransferComponent } from './connector-transfer.component';

describe('ConnectorTransferComponent', () => {
  let component: ConnectorTransferComponent;
  let fixture: ComponentFixture<ConnectorTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectorTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectorTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
