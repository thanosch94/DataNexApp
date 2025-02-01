import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnFileUploaderComponent } from './dn-file-uploader.component';

describe('FileUploaderComponent', () => {
  let component: DnFileUploaderComponent;
  let fixture: ComponentFixture<DnFileUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnFileUploaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DnFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
