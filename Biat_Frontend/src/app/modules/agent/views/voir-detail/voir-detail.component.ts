import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompteService } from 'src/app/core/services/Comptes/compte.service';

@Component({
  selector: 'app-voir-detail',
  templateUrl: './voir-detail.component.html',
  styleUrls: ['./voir-detail.component.css']
})
export class VoirDetailComponent implements OnInit {
  compte : any ;
  id!: number;

  constructor(private route : ActivatedRoute , private compteService : CompteService ){

  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.loadCompte(this.id);
    });
  }
  
  loadCompte(id: number): void {
    this.compteService.getCompteById(id).subscribe(
      (data: any) => {
        this.compte = data;
        console.log('Compte récupéré avec succès:', this.compte);
      },
      (error) => {
        console.error('Erreur lors de la récupération du compte:', error);
      }
    );
  }
}
