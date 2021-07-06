import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Demande} from '../model/demande';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }


  public AllAcceptedByUserId(UserId: string | undefined): Observable<Demande[]>
  {
    return this.http.get<Demande[]>(`${environment.BackUrl}:8083/demandes/Accepted/User/${UserId}`);
  }

  public AllArchivedByUserId(UserId: string | undefined): Observable<Demande[]>
  {
    return this.http.get<Demande[]>(`${environment.BackUrl}:8083/demandes/Archived/User/${UserId}`);
  }

  public AllCandidaturesByUserId(UserId: string | undefined): Observable<Demande[]>
  {
    return this.http.get<Demande[]>(`${environment.BackUrl}:8083/demandes/User/${UserId}`);
  }


}
