import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMateriaPrimaComponent } from './tipo-materia-prima.component';

describe('TipoMateriaPrimaComponent', () => {
  let component: TipoMateriaPrimaComponent;
  let fixture: ComponentFixture<TipoMateriaPrimaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoMateriaPrimaComponent]
    });
    fixture = TestBed.createComponent(TipoMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
