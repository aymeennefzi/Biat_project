import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueCompteAgenceComponent } from './statistique-compte-agence.component';

describe('StatistiqueCompteAgenceComponent', () => {
  let component: StatistiqueCompteAgenceComponent;
  let fixture: ComponentFixture<StatistiqueCompteAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiqueCompteAgenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueCompteAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
