import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualidadesComponent } from './qualidades.component';

describe('QualidadesComponent', () => {
  let component: QualidadesComponent;
  let fixture: ComponentFixture<QualidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
