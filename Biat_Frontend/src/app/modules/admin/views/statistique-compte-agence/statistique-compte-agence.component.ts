import { Component, OnInit } from '@angular/core';

import { CompteService } from 'src/app/core/services/Comptes/compte.service';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-statistique-compte-agence',
  templateUrl: './statistique-compte-agence.component.html',
  styleUrls: ['./statistique-compte-agence.component.css'],
})
export class StatistiqueCompteAgenceComponent implements OnInit {
  listeAgence!: any[];
  showMe: boolean = false;

  listAgents: any[] = [];
  agentId1!: number;
  agentId2!: number;
  NbCompteCreatedByAgentNumberOne!: number;
  NbCompteCreatedBySecondAgent!: number;
  selectedAgenceId!: number;
  nbCompteByAgence!: number;
  totaleAcount!: number;
  totaleClient!: number;
  totaleAgent!: number;
  totaleAgence!: number;
  totaleAcountEpargne!: number;
  totaleAcountCourant!: number;
  totaleAccountChequier!: number;

  chartData: ChartData<'bar'> = {
    labels: [
      'Comptes courants',
      'Comptes épargne',
      'Comptes chéquier',
      'Comptes totaux',
    ],
    datasets: [
      {
        label: 'Nombre de comptes ',
        data: [0, 0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733'],
      },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Statistiques des types de comptes',
      },
    },
  };

  chart!: Chart;

  constructor(private compteService: CompteService) {}

  ngOnInit() {
    this.compteService.getcompteByType().subscribe({
      next: (data: any) => {
        this.totaleAccountChequier = data.chequier;
        this.totaleAcountCourant = data.courant;
        this.totaleAcountEpargne = data.ep;
        this.compteService.getAllAcount().subscribe({
          next: (data: any) => {
            this.totaleAcount = data.length;
            this.updateChartData();
          },
          error: () => {},
        });
      },
      error: () => {},
    });
  }

  updateChartData() {
    this.chartData.datasets[0].data = [
      this.totaleAcountCourant,
      this.totaleAcountEpargne,
      this.totaleAccountChequier,
      this.totaleAcount,
    ];
    this.chart.update();
  }

  ngAfterViewInit() {
    this.chart = new Chart('compteTypeChart', {
      type: 'bar',
      data: this.chartData,
      options: this.chartOptions,
    });
  }
}
