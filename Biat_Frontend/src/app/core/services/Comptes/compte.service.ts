import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
 

  constructor(private http: HttpClient) { }
  getAllAcount() {
    return this.http.get<any[]>(`${environment.baseUrl}/compte/all`) .pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
}
   
  getAllAcountByAgence(id:number) {
    return this.http.get<any[]>(`${environment.baseUrl}/compte/all/${id}`) .pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );

  }
  ajouterCompte(compte: any): Observable<any> {
    const url = `${environment.baseUrl}/compte/add`; // Endpoint de votre API pour l'ajout de compte
    return this.http.post<any>(url, compte).pipe(
      catchError(error => {
        console.error('Error adding compte:', error);
        return throwError(error); // Gestion de l'erreur
      })
    );
  }
  getTypeCompteByClientId(clientId: number): Observable<any> {
    return this.http.get<any[]>(`${environment.baseUrl}/compte/type/${clientId}`)
  }
  getcompteByType() {
    return this.http.get<any>(`${environment.baseUrl}/compte/NbCompteByType`) .pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }

  getCompteById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/compte/${id}`);
  }

  getSoldeByClientId(clientId: number): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}/compte/solde/${clientId}`);
  }

}






