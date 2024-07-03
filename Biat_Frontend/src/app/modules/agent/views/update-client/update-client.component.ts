import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/core/services/Client/client.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {
  selectedFile: File | null = null;
  id!: number;

  
  secondFormGroup = this._formBuilder.group({
    dateNaissance: ['', Validators.required],
      numeroTelephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
  });
  isLinear = false;
  constructor(private _formBuilder: FormBuilder , private clientS: ClientService , private route : Router , private _route : ActivatedRoute) {}
ngOnInit(): void {
  this._route.params.subscribe((params) => {
    this.id = +params['id'];
    this.getInfoClient(this.id);
  });
}

updateForm = new FormGroup({
  // id: new FormControl(this.id) ,
  nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
  prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
  cin: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
  image: new FormControl('', [Validators.required]),
  numeroTelephone: new FormControl('', [Validators.required, Validators.minLength(3)]),
  dateNaissance: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  nationality: new FormControl('', [Validators.required, Validators.minLength(3)]),
  adresse: new FormControl('', [Validators.required, Validators.minLength(3)]),
});
Clear(){
  this.updateForm.reset();
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0] as File;
}

getInfoClient(id: number) {
  this.clientS.getClientById(id).subscribe(
    (data) => {
      console.log("Réponse de l'API:", data);
      this.updateForm.patchValue({
        nom: data.nom,
        prenom: data.prenom,
        cin: data.cin,
        image: data.image,
        numeroTelephone: data.numeroTelephone,
        dateNaissance: data.dateNaissance,
        email: data.email,
        password: data.password,
        nationality: data.nationality,
        adresse: data.adresse,
      });
    },
    (error) => {
      console.error("Erreur lors de la récupération de l'agence:", error);
    }
  );
}
updateClient() {
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir modifier cette agence ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, modifier',
  }).then((result) => {
    if (result.isConfirmed) {
      this.clientS
        .updateClient(this.id ,this.updateForm.value)
        .subscribe(
          (agenceUpdated: any) => {
            Swal.fire(
              'Client mise à jour !',
              "L'agence a été mise à jour avec succès.",
              'success'
            );
            this.route.navigate(['agent/All_Client']);
          },
          (error: any) => {
            console.error(
              "Erreur lors de la mise à jour de client :",
              error
            );
            Swal.fire(
              'Erreur',
              "Une erreur est survenue lors de la mise à jour de client.",
              'error'
            );
          }
        );
    }
  });
}
}
