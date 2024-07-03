import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgenceService } from 'src/app/core/services/Agence/agence.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-agence',
  templateUrl: './ajouter-agence.component.html',
  styleUrls: ['./ajouter-agence.component.css'],
})
export class AjouterAgenceComponent {
  AjouterAgenceForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    adresse: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    nom: new FormControl('', [Validators.required]),
    ville: new FormControl('', [Validators.required]),
    codePostal: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    fax: new FormControl('', [Validators.required]),
  });
  constructor(private agence_service: AgenceService, private _router: Router) {}
  ajouterAjance() {
    if (this.AjouterAgenceForm.valid) {
      this.agence_service.AjouterAgence(this.AjouterAgenceForm.value).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Inscription réussie',
            text: 'Vous pouvez voir la liste des agences',
            showConfirmButton: false,
            timer: 1500,
          });
          this._router.navigate(['admin/list-agence']);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Une erreur est survenue lors de l'inscription",
            footer: 'Veuillez réessayer',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'invalid data',
        footer: 'Veuillez réessayer',
      });
    }
  }
}
