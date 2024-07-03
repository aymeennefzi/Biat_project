import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenceService } from 'src/app/core/services/Agence/agence.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-agence',
  templateUrl: './update-agence.component.html',
  styleUrls: ['./update-agence.component.css'],
})
export class UpdateAgenceComponent implements OnInit {
  AjouterAgenceForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    adresse: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    id: new FormControl(''),
    nom: new FormControl('', [Validators.required]),
    ville: new FormControl('', [Validators.required]),
    codePostal: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    fax: new FormControl('', [Validators.required]),
  });

  constructor(
    private agence_service: AgenceService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  id!: number;

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = +params['id'];
      this.getInfoAgence(this.id);
    });
  }

  getInfoAgence(id: number) {
    this.agence_service.getAgenceById(id).subscribe(
      (data) => {
        console.log("Réponse de l'API:", data);
        this.AjouterAgenceForm.patchValue({
          id: data.id,
          nom: data.nom,
          email: data.email,
          adresse: data.adresse,
          ville: data.ville,
          codePostal: data.codePostal,
          fax: data.fax,
          telephone: data.telephone,
        });
      },
      (error) => {
        console.error("Erreur lors de la récupération de l'agence:", error);
      }
    );
  }

  modifierAgence() {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir modifier cette agence ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier',
    }).then((result) => {
      if (result.isConfirmed) {
        this.agence_service
          .updatyeagnce(this.AjouterAgenceForm.value)
          .subscribe(
            (agenceUpdated: any) => {
              Swal.fire(
                'Agence mise à jour !',
                "L'agence a été mise à jour avec succès.",
                'success'
              );
              this._router.navigate(['admin/list-agence']);
            },
            (error: any) => {
              console.error(
                "Erreur lors de la mise à jour de l'agence :",
                error
              );
              Swal.fire(
                'Erreur',
                "Une erreur est survenue lors de la mise à jour de l'agence.",
                'error'
              );
            }
          );
      }
    });
  }
}
