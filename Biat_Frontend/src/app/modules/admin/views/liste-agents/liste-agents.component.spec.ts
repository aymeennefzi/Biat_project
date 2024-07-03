import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAgentsComponent } from './liste-agents.component';

describe('ListeAgentsComponent', () => {
  let component: ListeAgentsComponent;
  let fixture: ComponentFixture<ListeAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAgentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
