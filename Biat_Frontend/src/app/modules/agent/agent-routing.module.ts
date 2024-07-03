import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAgentComponent } from './layout-agent/layout-agent.component';
import { DemandeChequierComponent } from './views/demande-chequier/demande-chequier.component';
import { AllClientComponent } from './views/all-client/all-client.component';
import { AddClientComponent } from './views/add-client/add-client.component';
import { AddAccountComponent } from './views/add-account/add-account.component';
import { AllAccountComponent } from './views/all-account/all-account.component';
import { VoirDetailComponent } from './views/voir-detail/voir-detail.component';
import { UpdateClientComponent } from './views/update-client/update-client.component';

const routes: Routes = [{
  path: '', component: LayoutAgentComponent, children: [
    { path: 'demande_chequier', component: DemandeChequierComponent },
    { path: 'All_Client' , component: AllClientComponent},
    { path: 'Add_Client' , component: AddClientComponent},
    { path: 'All_account' , component: AllAccountComponent},
    { path: 'Add_account' , component: AddAccountComponent},
    { path: 'voir_Details/:id', component: VoirDetailComponent },
    { path: 'update_client/:id', component: UpdateClientComponent },

  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule {}
