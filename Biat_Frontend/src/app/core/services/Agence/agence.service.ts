import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgenceService {
  constructor(private http: HttpClient) {}

  getAgents() {
    return this.http.get<any[]>(`${environment.baseUrl}/agent/all`).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }
  deleteAgent(id: number) {
    return this.http
      .delete(`${environment.baseUrl}/agent/supprimer/${id}`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  AjouterAgence(agence: any) {
    return this.http.post(`${environment.baseUrl}/agence/add`, agence).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }

  desaffecterAgentFromAgence(agentId: number) {
    return this.http
      .put(`${environment.baseUrl}/agent/dassign/${agentId}`, {})
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  geAgentByIdAgence(idAgence: number) {
    return this.http
      .get<any>(`${environment.baseUrl}/agent/by-agence/${idAgence}`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  getAgenceById(id: any) {
    return this.http.get<any>(`${environment.baseUrl}/agence/get/${id}`).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }
  updatyeagnce(agence: any) {
    return this.http
      .put<any>(`${environment.baseUrl}/agence/update`, agence)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }
}
