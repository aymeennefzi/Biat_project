import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgencesService } from 'src/app/core/services/Agence/agences.service';
import { AgentService } from 'src/app/core/services/Agent/agent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-agents',
  templateUrl: './liste-agents.component.html',
  styleUrls: ['./liste-agents.component.css'],
})
export class ListeAgentsComponent {
  constructor(
    private formBuilder: FormBuilder,
    private agentService: AgentService,
    private agence_services: AgencesService
  ) {}

  listAgents: any[] = [];

  selectedIdAgent!: number;

  selectedAgenceId: number | null = null;
  UniversiteForm!: FormGroup;
  rechercherAgent: string = '';

  listeAgence!: any[];

  ngOnInit() {
    this.getAllAgents();

    this.UniversiteForm = this.formBuilder.group({
      nomUniversite: ['', Validators.required],
      adresse: ['', Validators.required],
    });

    this.agence_services.getAllAgence().subscribe({
      next: (data: any) => {
        this.listeAgence = data;
        console.log('ee', this.listeAgence);
      },
      error: () => {},
    });
  }

  getAllAgents() {
    this.agentService.getAgents().subscribe({
      next: (data: any) => {
        this.listAgents = data;
        console.log(this.listAgents);
      },
      error: () => {},
    });
  }

  affecterAgentToUniversity() {
    if (this.selectedIdAgent !== null && this.selectedAgenceId !== null) {
      const listeAgentIds = [];
      listeAgentIds.push(this.selectedIdAgent);
      this.agentService
        .affecterAgentTOAgence(this.selectedAgenceId, listeAgentIds)
        .subscribe((res: any) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'L agent a été affecté avec succès',
          });
          this.getAllAgents();
        });
    } else {
      console.error('agent ID or agence id is not selected');
    }
  }

  desaffecterAgentFromAgence(id: number) {
    this.agentService.desaffecterAgentFromAgence(id).subscribe((res: any) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Le agent a été désaffecté avec succès',
      });

      this.getAllAgents();
    });
  }

  deleteAgent(id: number) {
    Swal.fire({
      title: "Supprimer l'agent ?",
      text: 'Êtes-vous sûr de vouloir supprimer cet agent ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.agentService.deleteAgent(id).subscribe(
          (res: any) => {
            Swal.fire({
              icon: 'success',
              title: "L'agent a été supprimée avec succès",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.getAllAgents();
          },
          (error) => {
            Swal.fire({
              icon: 'success',
              title: "L'agent a été supprimée avec succès",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
        );
      }
    });
  }

  openAffectModal(id: number) {
    this.selectedIdAgent = id;
  }
}
