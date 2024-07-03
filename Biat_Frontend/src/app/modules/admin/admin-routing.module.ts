import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AjouterAgentComponent } from './views/ajouter-agent/ajouter-agent.component';
import { ListeAgentsComponent } from './views/liste-agents/liste-agents.component';
import { StatistiquesComponent } from './views/statistiques/statistiques.component';
import { AjouterAgenceComponent } from './views/ajouter-agence/ajouter-agence.component';
import { ListAgenceComponent } from './views/list-agence/list-agence.component';
import { DetailsAgenceComponent } from './views/details-agence/details-agence.component';
import { UpdateAgenceComponent } from './views/update-agence/update-agence.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'update-agence/:id', component: UpdateAgenceComponent },
      { path: 'details-agence/:id', component: DetailsAgenceComponent },
      { path: 'list-agence', component: ListAgenceComponent },
      { path: 'ajouter-agence', component: AjouterAgenceComponent },
      { path: 'statistique', component: StatistiquesComponent },
      { path: 'list-agents', component: ListeAgentsComponent },
      { path: 'ajouter-agent', component: AjouterAgentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
