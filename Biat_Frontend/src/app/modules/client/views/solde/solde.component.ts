import { Component, OnInit } from '@angular/core';
import { CompteService } from 'src/app/core/services/Comptes/compte.service';

@Component({
  selector: 'app-solde',
  templateUrl: './solde.component.html',
  styleUrls: ['./solde.component.css']
})
export class SoldeComponent implements OnInit {
  solde: number | undefined;
  clientId : any ;
  constructor(
    private compteS : CompteService
  ){
    
  }
ngOnInit(): void {
  const userConnect = localStorage.getItem('userconnect');
    if (userConnect) {
      const user = JSON.parse(userConnect);
      this.clientId = user.id;
    }
  this.getSoldeClient(this.clientId);
}

getSoldeClient(clientId: number): void {
  this.compteS.getSoldeByClientId(clientId).subscribe(
    (solde) => {
      this.solde = solde;
      console.log('Solde du compte:', solde);
    },
    (error) => {
      console.error('Erreur lors de la récupération du solde du compte:', error);
    }
  );
}
}
