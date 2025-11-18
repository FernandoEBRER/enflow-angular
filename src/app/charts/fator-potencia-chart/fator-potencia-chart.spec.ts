import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatorPotenciaChart } from './fator-potencia-chart';

describe('FatorPotenciaChart', () => {
  let component: FatorPotenciaChart;
  let fixture: ComponentFixture<FatorPotenciaChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FatorPotenciaChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatorPotenciaChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
