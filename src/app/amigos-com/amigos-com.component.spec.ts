import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmigosComComponent } from './amigos-com.component';

describe('AmigosComComponent', () => {
  let component: AmigosComComponent;
  let fixture: ComponentFixture<AmigosComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmigosComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmigosComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
