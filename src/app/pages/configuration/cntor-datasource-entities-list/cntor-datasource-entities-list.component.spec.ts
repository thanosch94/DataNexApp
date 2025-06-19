import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CntorDatasourceEntitiesListComponent } from './cntor-datasource-entities-list.component';

describe('CntorDatasourceEntitiesListComponent', () => {
  let component: CntorDatasourceEntitiesListComponent;
  let fixture: ComponentFixture<CntorDatasourceEntitiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CntorDatasourceEntitiesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CntorDatasourceEntitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
