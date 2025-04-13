import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnRichTextEditorComponent } from './dn-rich-text-editor.component';

describe('DnRichTextEditorComponent', () => {
  let component: DnRichTextEditorComponent;
  let fixture: ComponentFixture<DnRichTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnRichTextEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DnRichTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
