import { NgIfContext } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DemandeChequeService } from 'src/app/core/services/Cheque/demande-cheque.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-chequier',
  templateUrl: './demande-chequier.component.html',
  styleUrls: ['./demande-chequier.component.css'],
})
export class DemandeChequierComponent implements OnInit {
  requests: any[] = [];
  isLoading: boolean = false;
  agentId: any;
  public noData!: TemplateRef<NgIfContext<boolean>>;

  constructor(private chequierS: DemandeChequeService) {}

  ngOnInit(): void {
    this.loadRequests();
  }
  loadRequests(): void {
    const userConnect = localStorage.getItem('userconnect');
    if (userConnect) {
      const user = JSON.parse(userConnect);
      this.agentId = user.id;
    }
    this.chequierS.getAllRequestsByAgentId(this.agentId).subscribe(
      (data) => {
        this.requests = data;
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des demandes d'agent:",
          error
        );
      }
    );
  }

  approveRequest(requestId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir approuver cette demande ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.chequierS.approveChequeBookRequest(requestId).subscribe(
          (response) => {
            console.log('Demande approuvée avec succès:', response);
            Swal.fire(
              'Succès',
              'La demande a été approuvée avec succès.',
              'success'
            );
            this.isLoading = false;
            this.ngOnInit();
          },
          (error) => {
            console.error("Erreur lors de l'approbation de la demande:", error);
            Swal.fire(
              'Erreur',
              "Erreur lors de l'approbation de la demande.",
              'error'
            );
            this.isLoading = false;
          }
        );
      }
    });
  }

  refuseRequest(requestId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir refuser cette demande ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.chequierS.refuseChequeBookRequest(requestId).subscribe(
          (response) => {
            console.log('Demande refusée avec succès:', response);
            Swal.fire(
              'Succès',
              'La demande a été refusée avec succès.',
              'success'
            );

            this.ngOnInit();
            this.isLoading = false;
          },
          (error) => {
            console.error('Erreur lors du refus de la demande:', error);
            Swal.fire(
              'Erreur',
              'la demande a été approuvé par l"administrateur.',
              'error'
            );
            this.isLoading = false;
          }
        );
      }
    });
  }
}
