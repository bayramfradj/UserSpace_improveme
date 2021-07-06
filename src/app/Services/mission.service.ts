import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Mission} from '../model/mission';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient) { }

  public getMission(id: bigint | undefined): Observable<Mission>
  {
    return this.http.get<Mission>(`${environment.BackUrl}:8083/missions/${id}`);
  }



}
