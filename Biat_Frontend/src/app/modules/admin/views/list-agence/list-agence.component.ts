import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencesService } from 'src/app/core/services/Agence/agences.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-agence',
  templateUrl: './list-agence.component.html',
  styleUrls: ['./list-agence.component.css'],
})
export class ListAgenceComponent implements OnInit {
  constructor(
    private agence_services: AgencesService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.getAllAgences();
  }

  listAgences: any[] = [];

  getAllAgences() {
    this.agence_services.getAllAgence().subscribe({
      next: (data: any) => {
        this.listAgences = data;
        console.log(this.listAgences);
      },
      error: () => {},
    });
  }

  deleteAgence(id: number) {
    Swal.fire({
      title: "Supprimer l'agence ?",
      text: 'Êtes-vous sûr de vouloir supprimer cette agence ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.agence_services.deleteAgence(id).subscribe(
          (res: any) => {
            Swal.fire({
              icon: 'success',
              title: "L'agence a été supprimée avec succès",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.getAllAgences();
          },
          (error) => {
            Swal.fire({
              icon: 'success',
              title: "L'agence a été supprimée avec succès",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
        );
      }
    });
  }

  voirDetails(id: number) {
    this._router.navigate(['/admin/details-agence/', id]);
  }
  updateAgence(id: number) {
    this._router.navigate(['/admin/update-agence/', id]);
  }
}
