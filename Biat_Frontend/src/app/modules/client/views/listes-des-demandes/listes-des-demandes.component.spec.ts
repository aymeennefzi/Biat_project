import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesDesDemandesComponent } from './listes-des-demandes.component';

describe('ListesDesDemandesComponent', () => {
  let component: ListesDesDemandesComponent;
  let fixture: ComponentFixture<ListesDesDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesDesDemandesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesDesDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
