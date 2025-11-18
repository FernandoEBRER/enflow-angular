import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumoCustoChart } from './consumo-custo-chart';

describe('ConsumoCustoChart', () => {
  let component: ConsumoCustoChart;
  let fixture: ComponentFixture<ConsumoCustoChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumoCustoChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumoCustoChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
