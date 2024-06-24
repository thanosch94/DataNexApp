import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorReceiveTransferEditComponent } from './connector-receive-transfer-edit.component';

describe('ConnectorReceiveTransferEditComponent', () => {
  let component: ConnectorReceiveTransferEditComponent;
  let fixture: ComponentFixture<ConnectorReceiveTransferEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectorReceiveTransferEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectorReceiveTransferEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
