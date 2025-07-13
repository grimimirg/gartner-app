import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Meteo } from './meteo';

describe('Meteo', () => {
  let component: Meteo;
  let fixture: ComponentFixture<Meteo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Meteo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Meteo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
