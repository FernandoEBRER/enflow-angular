import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-consumo-custo-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './consumo-custo-chart.html',
  styleUrl: './consumo-custo-chart.css',
})
export class ConsumoCustoChart {
  public chartType: ChartConfiguration['type'] = 'bar';

  public labels: string[] = [
    '03/22', '04/22', '05/22', '06/22',
    '07/22', '08/22', '09/22', '10/22',
    '11/22', '12/22', '01/23', '02/23'
  ];

  // VALORES DA IMAGEM (MWh)
  private consumoMwh = [
    60.2, 136, 320, 348,
    374, 448, 420, 188,
    127, 106, 223, 270
  ];

  // VALORES DA IMAGEM (R$)
  private custoTotal = [
    60200, 147595.87, 172142.97, 186000,
    206351.67, 200000, 172142.97, 86740.51,
    77000, 72000, 124000, 124537.75
  ];

  // plugin para desenhar textos nas barras e na linha
  public dataLabelPlugin = {
    id: 'dataLabelPlugin',
    afterDatasetsDraw: (chart: any) => {
      const ctx = chart.ctx;

      // DESENHAR APENAS SE O DATASET ESTIVER VISÍVEL

      // BARRAS (dataset 0)
      if (chart.isDatasetVisible(0)) {
        const barMeta = chart.getDatasetMeta(0);

        barMeta.data.forEach((bar: any, index: number) => {
          const pos = bar.tooltipPosition();
          const value = this.consumoMwh[index];

          ctx.save();
          ctx.font = '12px sans-serif';
          ctx.fillStyle = '#374151';
          ctx.textAlign = 'center';
          ctx.fillText(`${value} MWh`, pos.x, pos.y - 10);
          ctx.restore();
        });
      }

      // LINHA (dataset 1)
      if (chart.isDatasetVisible(1)) {
        const lineMeta = chart.getDatasetMeta(1);

        lineMeta.data.forEach((point: any, index: number) => {
          const pos = point.tooltipPosition();
          const value = this.custoTotal[index];

          ctx.save();
          ctx.font = '12px sans-serif';
          ctx.fillStyle = '#16a34a';
          ctx.textAlign = 'center';
          ctx.fillText(`R$ ${value.toLocaleString()}`, pos.x, pos.y - 10);
          ctx.restore();
        });
      }
    }
  };


  public plugins = [this.dataLabelPlugin];

  // TIPAGEM SOLTA PRA NÃO DAR ERRO
  public chartData: any = {
    labels: this.labels,
    datasets: [
      {
        label: 'Consumo de Energia',
        type: 'bar',
        data: this.consumoMwh,
        backgroundColor: '#2563eb',
        barPercentage: 0.6,        // barras um pouco mais largas
        categoryPercentage: 0.7,
      },
      {
        label: 'Custo total',
        type: 'line',
        data: this.custoTotal,
        borderColor: '#22c55e',
        backgroundColor: 'transparent',
        yAxisID: 'y1',
        tension: 0.4,
        pointRadius: 4,
        // bolinha vazada nos pontos
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#22c55e',
        pointBorderWidth: 2,
        pointStyle: 'circle',
      },
    ],
  };

  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 24, // espaço pro texto em cima
      },
    },
    scales: {
      // LEFT (MWh)
      y: {
        position: 'left',
        min: 0,
        suggestedMax: 500,
        ticks: {
          stepSize: 100,       // mais linhas horizontais
          display: false,      // esconde números
        },
        grid: {
          display: true,
          color: '#e5e7eb',
          drawBorder: false,
        },
      },

      // RIGHT (R$)
      y1: {
        position: 'right',
        grid: { display: false },
        ticks: {
          display: false,
        },
      },

      x: {
        grid: { display: false },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true, // bolinhas em vez de quadrados
          boxWidth: 10,
          padding: 8,
          font: { size: 11 },
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (ctx: any) => {
            const value = ctx.parsed.y ?? 0;
            if (ctx.datasetIndex === 0) {
              return `${value.toFixed(2)} MWh`;
            }
            return `R$ ${value.toLocaleString()}`;
          },
        }
      }
    }
  };
}
