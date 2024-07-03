import { NgIfContext } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeChequeService } from 'src/app/core/services/Cheque/demande-cheque.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listes-des-demandes',
  templateUrl: './listes-des-demandes.component.html',
  styleUrls: ['./listes-des-demandes.component.css']
})
export class ListesDesDemandesComponent implements OnInit{
  requests: any[] = [];
  clientId : any ;
  public noData!: TemplateRef<NgIfContext<boolean>>;

  constructor(private chequeS : DemandeChequeService , private route : Router ){

  }
  ngOnInit(): void {
    this.getAllRequestsByClientId();
  }
  getAllRequestsByClientId(): void {
    const userConnect = localStorage.getItem('userconnect');
    if (userConnect) {
      const user = JSON.parse(userConnect);
      this.clientId = user.id;
    }
    this.chequeS.getAllRequestsByClientId(this.clientId).subscribe(
      (requests) => {
        this.requests = requests;
        console.log('Demandes récupérées avec succès:', requests);
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes:', error);
      }
    );
  }
  deleteDemande(id: number) {
    Swal.fire({
      title: 'Supprimer la demande ?',
      text: 'Êtes-vous sûr de vouloir supprimer cette cette demande ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.chequeS.deleteChequeBookRequest(id).subscribe(
          (res: any) => {
            Swal.fire({
              icon: 'success',
              title: 'la demande a été supprimée avec succès',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.ngOnInit();
          },
          (error) => {
            Swal.fire({
              icon: 'success',
              title: 'la demande a été supprimée avec succès',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
        );
      }
    });
  }
  canDelete(status: string): boolean {
    return status !== 'APPROVED' && status !== 'REFUSED';
  }
  voirDetails(id: number) {
    this.route.navigate(['/client/voir_Details/', id]);
  }

}
