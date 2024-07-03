import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/core/services/Agent/agent.service';
import { ClientService } from 'src/app/core/services/Client/client.service';
import { CompteService } from 'src/app/core/services/Comptes/compte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  typesCompte: string[] = ['COURANT', 'EPARGNE', 'CHEQUIER']; 
  clients: any[] = []; 
  agentDetails: any = {}; 
  agentId!: number;
  compteForm: FormGroup;
  selectedClientId!: number; 
  selectedClientDetails: any; 
  currentDate!: string; 
  constructor(
    private _formBuilder: FormBuilder, 
    private clientS : ClientService,
    private agentS : AgentService,
    private compteS : CompteService,
    private route : Router
  ) 
    {
      this.currentDate = new Date().toISOString().split('T')[0]; 
      this.compteForm = this._formBuilder.group({
        typeCompte: ['', Validators.required],
        numeroCompte: ['', Validators.required],
        agentId: [''],
        agenceId: [''],
        clientId: [''],
        solde: [0, Validators.required], 
        dateCreation: [this.currentDate, Validators.required] 
      });
    }
  
    ngOnInit(): void {
    this.getClients();
    const userConnect = localStorage.getItem('userconnect');
    if (userConnect) {
      const user = JSON.parse(userConnect);
      this.agentId = user.id;
      this.getAgentDetails(this.agentId);
      console.log(this.agentId)
    } else {
      console.error('No userconnect data found in localStorage');
    }
  
  }
  
  secondFormGroup = this._formBuilder.group({
    dateNaissance: ['', Validators.required],
      numeroTelephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
  });
  isLinear = false;

  getClients() {
    this.clientS.getClient().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
  getAgentDetails(id: number) {
    this.agentS.getAgentById(id).subscribe(
      (data) => {
        this.agentDetails = data;
        console.log(data)
        this.compteForm.patchValue({
          agentId: this.agentDetails.id,
          agent_nom: `${this.agentDetails.nom} ${this.agentDetails.prenom}` ,
          agenceId: this.agentDetails.agence.id
        });
      },
      (error) => {
        console.error('Error fetching agent details:', error);
      }
    );
  }

  onClientSelected(): void {
    this.clientS.getClientById(this.selectedClientId).subscribe(
      (data) => {
        this.selectedClientDetails = data; 
        console.log('Selected client:', this.selectedClientDetails); 
      },
      (error) => {
        console.error('Error fetching client details:', error);
      }
    );
  }
  ajouterCompte(): void {
    if (this.compteForm.valid) {
      const compteData = {
        numeroCompte: this.compteForm.value.numeroCompte,
        typeCompte: this.compteForm.value.typeCompte,
        solde: this.compteForm.value.solde,
        dateCreation: this.compteForm.value.dateCreation,
        client: { id: this.compteForm.value.clientId },
        agent: { id: this.compteForm.value.agentId },
        agence: { id: this.compteForm.value.agenceId }
      };

      this.compteS.ajouterCompte(compteData).subscribe(
        (response) => {
          console.log('Compte ajouté avec succès:', response);
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'Compte ajouté avec succès.'
          }).then(() => {
            this.route.navigate(['agent/All_account']); 
          });
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du compte:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur est survenue lors de l\'ajout du compte.'
          });
        }
      );
    } else {
      console.error('Formulaire invalide. Veuillez vérifier les champs.');
      Swal.fire({
        icon: 'warning',
        title: 'Attention!',
        text: 'Formulaire invalide. Veuillez vérifier les champs.'
      });
    }
  }
 
 
  
}
