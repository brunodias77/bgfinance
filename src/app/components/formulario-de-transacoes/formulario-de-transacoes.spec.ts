import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeTransacoes } from './formulario-de-transacoes';

describe('FormularioDeTransacoes', () => {
  let component: FormularioDeTransacoes;
  let fixture: ComponentFixture<FormularioDeTransacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDeTransacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDeTransacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
