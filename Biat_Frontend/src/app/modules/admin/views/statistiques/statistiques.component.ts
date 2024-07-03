import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { AgentService } from 'src/app/core/services/Agent/agent.service';
import { AgencesService } from 'src/app/core/services/Agence/agences.service';
import { CompteService } from 'src/app/core/services/Comptes/compte.service';
import { ClientService } from 'src/app/core/services/Client/client.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css'],
})
export class StatistiquesComponent implements OnInit {
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
  constructor(
    private agentService: AgentService,
    private agence_services: AgencesService,
    private compteService: CompteService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.compteService.getcompteByType().subscribe({
      next: (data: any) => {
        console.log('welcome to falouja', data);
        this.totaleAccountChequier = data.chequier;
        console.log(this.totaleAccountChequier);
        this.totaleAcountCourant = data.courant;
        this.totaleAcountEpargne = data.ep;
      },
      error: () => {},
    });

    this.compteService.getAllAcount().subscribe({
      next: (data: any) => {
        this.totaleAcount = data.length;
      },
      error: () => {},
    });

    this.agence_services.getAllAgence().subscribe({
      next: (data: any) => {
        this.totaleAgence = data.length;
      },
      error: () => {},
    });

    this.clientService.getClient().subscribe({
      next: (data: any) => {
        this.totaleClient = data.length;
      },
      error: () => {},
    });

    this.agence_services.getAllAgence().subscribe({
      next: (data: any) => {
        this.listeAgence = data;
      },
      error: () => {},
    });

    this.agentService.getAgents().subscribe({
      next: (data: any) => {
        this.totaleAgent = data.length;
      },
      error: () => {},
    });

    this.createChart();
  }

  onAgenceChange(event: any) {
    this.selectedAgenceId = event.target.value;
    this.getAllAgents();

    this.compteService.getAllAcountByAgence(event.target.value).subscribe({
      next: (data: any) => {
        this.nbCompteByAgence = data.length;
        console.log('length', this.nbCompteByAgence);
      },
      error: () => {},
    });

    console.log('Selected Agence ID:', this.selectedAgenceId);
  }

  onAgentOneChange(event: any) {
    this.agentId1 = event.target.value;
    console.log('Selected Agent ID:', this.agentId1);
  }

  onAgentSecondChange(event: any) {
    this.agentId2 = event.target.value;
    console.log('Selected Agent ID:', this.agentId2);
  }

  updateCounter() {
    const purecounterElements = document.querySelectorAll(
      '.purecounterAccount'
    );
    purecounterElements.forEach((element) => {
      element.setAttribute(
        'data-purecounter-end',
        this.totaleAcount.toString()
      );
    });
  }

  updateCounterAgence() {
    const purecounterElements = document.querySelectorAll('.purecounterAgence');
    purecounterElements.forEach((element) => {
      element.setAttribute(
        'data-purecounter-end',
        this.totaleAgence.toString()
      );
    });
  }

  updateCounterClient() {
    const purecounterElements = document.querySelectorAll('.purecounterClient');
    purecounterElements.forEach((element) => {
      element.setAttribute(
        'data-purecounter-end',
        this.totaleClient.toString()
      );
    });
  }

  updateCounterAgent() {
    const purecounterElements = document.querySelectorAll('.purecounterAgents');
    purecounterElements.forEach((element) => {
      element.setAttribute('data-purecounter-end', this.totaleAgent.toString());
    });
  }

  lancerComparaison() {
    if (this.agentId1 && this.agentId2) {
      this.loadAgentProductivityData();
      this.showMe = true;
    } else {
      console.error(
        'Veuillez sélectionner deux agents pour lancer la comparaison.'
      );
    }
  }

  loadAgentProductivityData() {
    this.agentService
      .getAgentProductivityComparison(this.agentId1, this.agentId2)
      .subscribe(
        (data: any) => {
          this.NbCompteCreatedByAgentNumberOne = data.comptesAgent1;
          this.NbCompteCreatedBySecondAgent = data.comptesAgent2;
          this.createChart();
        },
        (error) => {
          console.error(
            'Error fetching agent productivity comparison data',
            error
          );
        }
      );
  }

  getAllAgents() {
    this.agentService.geAgentByIdAgence(this.selectedAgenceId).subscribe({
      next: (data: any) => {
        this.listAgents = data;
      },
      error: () => {},
    });
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Nombre des Comptes totale dans l agence',
          'Nombre des Comptes Crées par premiére Agent',
          'Nombre des Comptes Crées par deusiéme Agent',
        ],
        datasets: [
          {
            label: 'My First Dataset',
            data: [
              this.nbCompteByAgence,
              this.NbCompteCreatedByAgentNumberOne,
              this.NbCompteCreatedBySecondAgent,
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }

  // createChart() {
  //   this.compteService.getcompteByType().subscribe({
  //     next: (data: any) => {
  //       this.totaleAccountChequier = data.chequier;
  //       this.totaleAcountCourant = data.courant;
  //       this.totaleAcountEpargne = data.ep;
  //     },
  //     error: () => {},
  //   });

  //   const ctx = document.getElementById('myBarChart') as HTMLCanvasElement;
  //   const config: ChartConfiguration = {
  //     type: 'bar',
  //     data: {
  //       labels: ['EPARGNE', 'COURANT', 'CHEQUIER'],
  //       datasets: [
  //         {
  //           label: 'Nombre des Comptes par Type',
  //           data: [
  //             this.totaleAcountEpargne,
  //             this.totaleAccountChequier,
  //             this.totaleAcountCourant,
  //           ],
  //           backgroundColor: [
  //             'rgba(255, 99, 132, 0.2)',
  //             'rgba(54, 162, 235, 0.2)',
  //             'rgba(255, 205, 86, 0.2)',
  //           ],
  //           borderColor: [
  //             'rgb(255, 99, 132)',
  //             'rgb(54, 162, 235)',
  //             'rgb(255, 205, 86)',
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   };
  //   new Chart(ctx, config);
  // }
}
