import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesrecomendacaoComponent } from './desrecomendacao.component';

describe('DesrecomendacaoComponent', () => {
  let component: DesrecomendacaoComponent;
  let fixture: ComponentFixture<DesrecomendacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesrecomendacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesrecomendacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
