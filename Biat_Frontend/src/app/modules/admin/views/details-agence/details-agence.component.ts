import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgenceService } from 'src/app/core/services/Agence/agence.service';

@Component({
  selector: 'app-details-agence',
  templateUrl: './details-agence.component.html',
  styleUrls: ['./details-agence.component.css'],
})
export class DetailsAgenceComponent implements OnInit {
  agence: any;
  constructor(
    private agence_service: AgenceService,

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
        this.agence = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération de l'agence:", error);
      }
    );
  }
}
