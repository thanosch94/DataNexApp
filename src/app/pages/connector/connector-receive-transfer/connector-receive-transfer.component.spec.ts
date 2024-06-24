import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorReceiveTransferComponent } from './connector-receive-transfer.component';

describe('ConnectorTransferComponent', () => {
  let component: ConnectorReceiveTransferComponent;
  let fixture: ComponentFixture<ConnectorReceiveTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectorReceiveTransferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectorReceiveTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
