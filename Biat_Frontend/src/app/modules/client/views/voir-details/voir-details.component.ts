import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandeChequeService } from 'src/app/core/services/Cheque/demande-cheque.service';

@Component({
  selector: 'app-voir-details',
  templateUrl: './voir-details.component.html',
  styleUrls: ['./voir-details.component.css']
})
export class VoirDetailsComponent {
  demande : any ;
  id!: number;

  constructor(private route : ActivatedRoute , private chequeS : DemandeChequeService ){

  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.loadDemande(this.id);
    });
  }
  
  loadDemande(id: number): void {
    this.chequeS.getDemandeById(id).subscribe(
      (data: any) => {
        this.demande = data;
        console.log('demande récupéré avec succès:', this.demande);
      },
      (error) => {
        console.error('Erreur lors de la récupération de demande:', error);
      }
    );
  }
}
