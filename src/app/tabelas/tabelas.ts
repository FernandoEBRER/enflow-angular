import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumoCustoChart } from '../charts/consumo-custo-chart/consumo-custo-chart';
import { FatorPotenciaChart } from '../charts/fator-potencia-chart/fator-potencia-chart';
import { FormsModule } from '@angular/forms';
import { Monitoramento } from '../monitoramento/monitoramento';

@Component({
  selector: 'app-tabelas',
  standalone: true,
  imports: [CommonModule, FormsModule, ConsumoCustoChart, FatorPotenciaChart, Monitoramento],
  templateUrl: './tabelas.html',
  styleUrl: './tabelas.css',
})
export class Tabelas {
  selectedMenu: 'Monitoramento' | 'Gestão' | 'Custos' | 'Energia' | 'Energia' |
    'Métricas' | 'Imprimir' | 'Meus Filtros' = 'Energia';

  setMenu(menu: typeof this.selectedMenu) {
    this.selectedMenu = menu;
  }

  

  // FILTRO SELECIONADO: '12m' | 'mes' | 'ativo' | 'criticidade'
  filtroSelecionado: '12m' | 'mes' | 'ativo' | 'criticidade' = '12m';

  // Mês escolhido no input (formato yyyy-mm, ex: '2023-08')
  mesSelecionado: string = '';

  // Exemplo de dados brutos (você adaptaria pro seu caso real)
  todosOsDados = [
    // aqui ficariam seus registros com data, consumo, etc
  ];

  dadosFiltrados = this.todosOsDados;

  setFiltro(filtro: '12m' | 'mes' | 'ativo' | 'criticidade') {
    this.filtroSelecionado = filtro;

    if (filtro === '12m') {
      this.aplicarUltimos12Meses();
    }

    // se for 'mes', só abre o input; o filtro roda quando o usuário escolher o mês
  }

  aplicarUltimos12Meses() {
    // Exemplo bem simples: pegando 12 últimos itens
    // No seu caso você pode filtrar por data de verdade
    this.dadosFiltrados = this.todosOsDados.slice(-12);

    // aqui você chamaria algo tipo:
    // this.consumoChart.atualizar(this.dadosFiltrados);
    // this.tabela = this.dadosFiltrados;
  }

  onMesChange(mes: string) {
    this.mesSelecionado = mes;

    if (!mes) return;

    // Exemplo: filtrando por mês (você adapta pro formato da sua data)
    this.dadosFiltrados = this.todosOsDados.filter(d => d === mes);

    // mesma ideia: atualizar gráficos/tabelas aqui
    // this.consumoChart.atualizar(this.dadosFiltrados);
  }

}
