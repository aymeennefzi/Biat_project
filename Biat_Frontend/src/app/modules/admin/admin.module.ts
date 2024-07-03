import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { RechercheEtudiantPipe } from 'src/app/core/pipes/Etudiant/recherche-etudiant.pipe';
import { RechercheUniversitePipe } from 'src/app/core/pipes/Universite/recherche-universite.pipe';
import { AjouterAgentComponent } from './views/ajouter-agent/ajouter-agent.component';
import { ListeAgentsComponent } from './views/liste-agents/liste-agents.component';
import { StatistiquesComponent } from './views/statistiques/statistiques.component';
import { StatistiqueCompteAgenceComponent } from './views/statistique-compte-agence/statistique-compte-agence.component';
import { AjouterAgenceComponent } from './views/ajouter-agence/ajouter-agence.component';
import { ListAgenceComponent } from './views/list-agence/list-agence.component';
import { DetailsAgenceComponent } from './views/details-agence/details-agence.component';
import { UpdateAgenceComponent } from './views/update-agence/update-agence.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,

    RechercheEtudiantPipe,
    RechercheUniversitePipe,
    AjouterAgentComponent,
    ListeAgentsComponent,
    StatistiquesComponent,
    StatistiqueCompteAgenceComponent,
    AjouterAgenceComponent,
    ListAgenceComponent,
    DetailsAgenceComponent,
    UpdateAgenceComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AdminModule {}
