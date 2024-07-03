import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/core/services/Agent/agent.service';
import { DemandeChequeService } from 'src/app/core/services/Cheque/demande-cheque.service';
import { ClientService } from 'src/app/core/services/Client/client.service';
import { CompteService } from 'src/app/core/services/Comptes/compte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-cheque',
  templateUrl: './demande-cheque.component.html',
  styleUrls: ['./demande-cheque.component.css']
})
export class DemandeChequeComponent implements OnInit {
  demandeForm: FormGroup;
  clientId!: number;
  agentDetails: any = {}; 
  currentDate!: string; 
  clientId1 : any;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder , private agentS : AgentService , private chequeS : DemandeChequeService , private clientS : ClientService , private compteS : CompteService , private route : Router) {
    this.currentDate = new Date().toISOString().split('T')[0]; 
    const userConnect = localStorage.getItem('userconnect');
    if (userConnect) {
      const user = JSON.parse(userConnect);
      this.clientId1 = user.id;
    }
    this.demandeForm = this._formBuilder.group({
      requestDate: [this.currentDate, Validators.required],
      reason: ['', Validators.required],
      agentId: [''],
      agenceId: [''],
      clientId: [this.clientId1],
      status: ['PENDING', Validators.required], 
    });
  }

  ngOnInit(): void {
    const userConnect = localStorage.getItem('userconnect');
    if (userConnect) {
      const user = JSON.parse(userConnect);
      this.clientId = user.id;
      this.getAgentDetails(this.clientId);
    } else {
      console.error('No userconnect data found in localStorage');
    }
  }
  getAgentDetails(id: number) {
    this.clientS.getAgentByClientId(id).subscribe(
      (data) => {
        this.agentDetails = data;
        this.demandeForm.patchValue({
          agentId: this.agentDetails.id,
          agenceId: this.agentDetails.agence.id
        });
      },
      (error) => {
        console.error('Error fetching agent details:', error);
      }
    );
  }
 
  ajouterDemande() {
    if (this.demandeForm.valid) {
      const clientId = this.demandeForm.value.clientId;
      this.compteS.getTypeCompteByClientId(clientId).subscribe(
        (typeCompte) => {
          if (typeCompte === 'CHEQUIER') {
            const compteData = {
              client: { id: this.demandeForm.value.clientId },
              agent: { id: this.demandeForm.value.agentId },
              reason: this.demandeForm.value.reason,
              agence: { id: this.demandeForm.value.agenceId },
              requestDate: this.demandeForm.value.requestDate,
              status: this.demandeForm.value.status,
            };  
            this.chequeS.createChequeBookRequest(compteData).subscribe(
              (response) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Succès',
                  text: 'Demande ajoutée avec succès!'
                }).then(() => {
                  this.route.navigate(['/client/Liste_des_Demande']);
                });
              }
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Le type de compte doit être CHEQUIER pour effectuer une demande.'
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de la vérification du type de compte.'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Formulaire invalide. Veuillez vérifier les champs.'
      });
    }
  }
  
}