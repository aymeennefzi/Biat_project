import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAgenceComponent } from './details-agence.component';

describe('DetailsAgenceComponent', () => {
  let component: DetailsAgenceComponent;
  let fixture: ComponentFixture<DetailsAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAgenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
