import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeChequierComponent } from './demande-chequier.component';

describe('DemandeChequierComponent', () => {
  let component: DemandeChequierComponent;
  let fixture: ComponentFixture<DemandeChequierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeChequierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeChequierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
