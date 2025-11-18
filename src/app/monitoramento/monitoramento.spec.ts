import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Monitoramento } from './monitoramento';

describe('Monitoramento', () => {
  let component: Monitoramento;
  let fixture: ComponentFixture<Monitoramento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Monitoramento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Monitoramento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
