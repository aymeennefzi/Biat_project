import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }


  getClient() {
    return this.http.get<any[]>(`${environment.baseUrl}/client/all`) .pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }

  deleteClient(id:number){
    return this.http.delete(`${environment.baseUrl}/client/supprimer/${id}`) .pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }
  getClientById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/client/${id}`);
  }
  getAgentByClientId(clientId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/client/${clientId}/agent`);
  }

  getAgenceByClientId(clientId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${clientId}/agence`);

  }
  updateClient(id : any , client: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/client/update/${id}`, client);
  }
}
