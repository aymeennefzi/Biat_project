import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgencesService {
  constructor(private http: HttpClient) {}
  deleteAgence(id: number) {
    return this.http
      .delete(`${environment.baseUrl}/agence/supprimer/${id}`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  getAllAgence() {
    return this.http.get<any[]>(`${environment.baseUrl}/agence/all`).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }

  getAgenceById(id: any) {
    return this.http.get<any[]>(`${environment.baseUrl}/agence/${id}`).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }
}
