import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoMateriaPrimaComponent } from './gasto-materia-prima.component';

describe('GastoMateriaPrimaComponent', () => {
  let component: GastoMateriaPrimaComponent;
  let fixture: ComponentFixture<GastoMateriaPrimaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GastoMateriaPrimaComponent]
    });
    fixture = TestBed.createComponent(GastoMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
