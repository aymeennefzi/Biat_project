import { NgIfContext } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CompteService } from 'src/app/core/services/Comptes/compte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-account',
  templateUrl: './all-account.component.html',
  styleUrls: ['./all-account.component.css']
})
export class AllAccountComponent implements OnInit{
  ListofAccount : any[] = []; 
  currentPopup: string | null = null;
  public noData!: TemplateRef<NgIfContext<boolean>>;

  constructor(
    private compteS : CompteService,
    private route : Router
  ){

  }
  ngOnInit(): void {
    this.getComptes();
  }
  getComptes() {
    this.compteS.getAllAcount().subscribe(
      (data) => {
        this.ListofAccount = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
  voirDetails(id: number) {
    this.route.navigate(['/agent/voir_Details/', id]);
  }

  
}
