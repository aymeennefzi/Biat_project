import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ClientProfileComponent } from './views/client-profile/client-profile.component';
import { ListesDesDemandesComponent } from './views/listes-des-demandes/listes-des-demandes.component';
import { DemandeChequeComponent } from './views/demande-cheque/demande-cheque.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { SoldeComponent } from './views/solde/solde.component';
import { VoirDetailsComponent } from './views/voir-details/voir-details.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ClientProfileComponent,
    ListesDesDemandesComponent,
    DemandeChequeComponent,
    SoldeComponent,
    VoirDetailsComponent,
 
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ClientModule { }
