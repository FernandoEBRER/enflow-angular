import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabelas } from './tabelas';

describe('Tabelas', () => {
  let component: Tabelas;
  let fixture: ComponentFixture<Tabelas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tabelas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tabelas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
