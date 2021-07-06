import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Skills } from '../model/skills';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Skills[]>
  {
    return this.http.get<Skills[]>(`${environment.BackUrl}:8082/skills/`);
  }
}
