import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Medicao {
  data_hora: string;
  id?: number | string;
  descricao?: string;
  corrente?: number | string;
  tensao?: number | string;
  potencia?: number | string;
  energia?: number | string;
  frequencia?: number | string;
  fatorPotencia?: number | string;
  energiaReativa?: number | string;
  potenciaReativa?: number | string;
  status?: string;
}

@Component({
  selector: 'app-monitoramento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monitoramento.html',
  styleUrl: './monitoramento.css',
})
export class Monitoramento implements OnInit {
  constructor(private http: HttpClient) {}

  private readonly apiUrl =
    'https://grupo-7-energias-back-end.3du0va.easypanel.host/api/medicoes';

  medicoes: Medicao[] = [];
  carregando = false;
  erro: string | null = null;

  ngOnInit(): void {
    this.carregarMedicoes();
  }

  carregarMedicoes() {
    this.carregando = true;
    this.erro = null;

    this.http.get<Medicao[]>(this.apiUrl).subscribe({
      next: (dados) => {
        console.log('Dados recebidos da API:', dados);

        this.medicoes = Array.isArray(dados) ? dados : [];

        if (this.medicoes.length === 0) {
          this.erro = 'Nenhuma medição retornada da API.';
        }

        this.carregando = false;
      },
      error: (err) => {
        console.error('Falha ao carregar dados:', err);
        this.erro = 'Falha ao carregar dados da API.';
        this.carregando = false;
      },
    });
  }
}
