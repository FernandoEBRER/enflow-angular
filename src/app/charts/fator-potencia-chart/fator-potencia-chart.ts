import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-fator-potencia-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './fator-potencia-chart.html',
  styleUrl: './fator-potencia-chart.css',
})
export class FatorPotenciaChart {
  labels: string[] = [
    '03/22', '04/22', '05/22', '06/22',
    '07/22', '08/22', '09/22', '10/22',
    '11/22', '12/22', '01/23', '02/23'
  ];

  valores: number[] = [
    80.32, 92.26, 92.16, 90.44,
    90.82, 92.20, 90.51, 89.79,
    31.33, 87.36, 82.87, 84.79
  ];

  limiteCritico = 85;   // linha tracejada
  verdeIdeal    = 92;   // acima disso -> verde
  vermelhoForte = 50;   // abaixo disso -> vermelho

  // cor da barra conforme o valor
  private getBarColor(v: number): string {
    if (v < this.vermelhoForte) return '#ef4444'; // vermelho
    if (v >= this.verdeIdeal)   return '#22c55e'; // verde
    return '#2563eb';                               // azul
  }

  // plugin: escreve valor em cima da barra + badge "Crítico"
  public dataLabelPlugin: any = {
    id: 'dataLabelPlugin',
    afterDatasetsDraw: (chart: any) => {
      const ctx: CanvasRenderingContext2D = chart.ctx;
      const meta = chart.getDatasetMeta(0); // dataset das barras

      ctx.save();
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';

      meta.data.forEach((bar: any, index: number) => {
        const value = this.valores[index];
        const { x, y } = bar.tooltipPosition();

        // valor em cima da barra
        ctx.fillStyle = '#374151';
        ctx.fillText(`${value.toFixed(2)}%`, x, y - 10);

        // badge "Crítico" só para valor bem baixo (barra vermelha)
        if (value < this.vermelhoForte) {
          const text = 'Crítico';
          const paddingX = 6;
          const paddingY = 3;
          const textWidth = ctx.measureText(text).width;
          const boxWidth = textWidth + paddingX * 2;
          const boxHeight = 16;

          ctx.fillStyle = '#fee2e2'; // fundo rosa claro
          ctx.fillRect(
            x - boxWidth / 2,
            y - 35,
            boxWidth,
            boxHeight
          );

          ctx.fillStyle = '#dc2626'; // texto vermelho
          ctx.fillText(text, x, y - 23);
        }
      });

      ctx.restore();
    }
  };

  public plugins = [this.dataLabelPlugin];

  chartType: ChartConfiguration['type'] = 'bar';

  // tipagem solta pra não encher o saco
  chartData: any = {
    labels: this.labels,
    datasets: [
      {
        // BARRAS
        type: 'bar',
        data: this.valores,
        backgroundColor: this.valores.map(v => this.getBarColor(v)),
        barPercentage: 0.6,   // mesma largura que usamos no outro gráfico
        categoryPercentage: 0.7,
      },
      {
        // LINHA TRACEJADA DO LIMITE CRÍTICO
        type: 'line',
        label: 'Limite crítico',
        data: this.labels.map(() => this.limiteCritico),
        borderColor: '#f97316',
        borderWidth: 1.5,
        borderDash: [6, 6],
        pointRadius: 0,
      },
    ],
  };

  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 24, // espaço pro texto em cima
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,    // 0,20,40,60,80,100 -> 6 linhas horizontais
          display: false,
        },
        grid: {
          display: true,
          color: '#e5e7eb',
          drawBorder: false,
        },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        border: { display: false },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 8,
          font: { size: 10 },
          // só mostra o dataset da linha (índice 1)
          filter: (item: any) => item.datasetIndex === 1,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const value = ctx.parsed.y ?? 0;
            return `${value.toFixed(2)}%`;
          },
        },
      },
    },
  };
}
