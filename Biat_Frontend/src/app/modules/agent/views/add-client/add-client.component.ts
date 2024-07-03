import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  selectedFile: File | null = null;

  
  secondFormGroup = this._formBuilder.group({
    dateNaissance: ['', Validators.required],
      numeroTelephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
  });
  isLinear = false;
  constructor(private _formBuilder: FormBuilder , private authenticationService: AuthenticationService , private route : Router) {}


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  registerForm = new FormGroup({
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
    addValueToFormData('numeroTelephone', this.registerForm.get('numeroTelephone')?.value);
    addValueToFormData('dateNaissance', this.registerForm.get('dateNaissance')?.value);
    addValueToFormData('email', this.registerForm.get('email')?.value);
    addValueToFormData('password', this.registerForm.get('password')?.value);
    addValueToFormData('nationality', this.registerForm.get('nationality')?.value);
    addValueToFormData('adresse', this.registerForm.get('adresse')?.value);


    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.authenticationService.registerClient(formData).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'Vous pouvez voir la liste des agents',
          showConfirmButton: false,
          timer: 1500
        });
        this.route.navigate(['agent/All_Client']);

      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de l\'inscription',
          footer: 'Veuillez réessayer'
        });
      }
    );
  }

  Clear(){
    this.registerForm.reset();
  }
}
