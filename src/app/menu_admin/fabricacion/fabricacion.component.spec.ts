import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricacionComponent } from './fabricacion.component';

describe('FabricacionComponent', () => {
  let component: FabricacionComponent;
  let fixture: ComponentFixture<FabricacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricacionComponent]
    });
    fixture = TestBed.createComponent(FabricacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
