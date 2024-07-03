import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DemandeChequeComponent } from './views/demande-cheque/demande-cheque.component';
import { ListesDesDemandesComponent } from './views/listes-des-demandes/listes-des-demandes.component';
import { SoldeComponent } from './views/solde/solde.component';
import { VoirDetailsComponent } from './views/voir-details/voir-details.component';

 
const routes: Routes = [
  {path:'',component:LayoutComponent, children:[
    { path: 'Liste_des_Demande', component: ListesDesDemandesComponent },
    { path: 'Demande-cheque', component: DemandeChequeComponent },
    { path: 'solde', component: SoldeComponent },
    { path: 'voir_Details/:id', component: VoirDetailsComponent },
] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
