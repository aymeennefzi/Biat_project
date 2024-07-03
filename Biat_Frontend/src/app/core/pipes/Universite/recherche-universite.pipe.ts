import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercheUniversite'
})
export class RechercheUniversitePipe implements PipeTransform {
  transform(agents: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return agents;
    }

    return agents.filter((agent) =>
      agent.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}