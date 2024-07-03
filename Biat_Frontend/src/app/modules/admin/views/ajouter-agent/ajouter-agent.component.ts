import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-agent',
  templateUrl: './ajouter-agent.component.html',
  styleUrls: ['./ajouter-agent.component.css'],
})
export class AjouterAgentComponent {
  registerForm = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cin: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    image: new FormControl('', [Validators.required]),
    numeroTelephone: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dateNaissance: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  register() {
    const formData = new FormData();

    const addValueToFormData = (key: string, value: any) => {
      if (value != null) {
        formData.append(key, value);
      }
    };

    addValueToFormData('nom', this.registerForm.get('nom')?.value);
    addValueToFormData('prenom', this.registerForm.get('prenom')?.value);
    addValueToFormData('cin', this.registerForm.get('cin')?.value);
    addValueToFormData(
      'numeroTelephone',
      this.registerForm.get('numeroTelephone')?.value
    );
    addValueToFormData(
      'dateNaissance',
      this.registerForm.get('dateNaissance')?.value
    );
    addValueToFormData('email', this.registerForm.get('email')?.value);
    addValueToFormData('password', this.registerForm.get('password')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.authenticationService.registerAgent(formData).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'Vous pouvez voir la liste des agents',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['admin/list-agents']);
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
  }

  Clear() {
    this.registerForm.reset();
  }
}
