import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from '../model/profile';
import {environment} from '../../environments/environment';
import { Experience } from '../model/experience';
import { Skills } from '../model/skills';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(userId: string | undefined): Observable<any>
  {
    if (userId === undefined) {
      return new Observable<any>();
    }
    return this.http.get<Profile>(`${environment.BackUrl}/profiles/${userId}`);
  }

  addProfile(profile: Profile): Observable<Profile>
  {
    return this.http.post<Profile>(`${environment.BackUrl}/profiles/`, profile);
  }

  upProfile(profile: Profile): Observable<Profile>
  {
    console.log(profile);
    return this.http.put<Profile>(`${environment.BackUrl}/profiles/`, profile);
  }

  addExperience(experience: Experience, id: bigint): Observable<Experience>
  {

    return this.http.post<Experience>(`${environment.BackUrl}/profiles/experience/${id}`, experience);
  }

  addSkillsToProfile(skills: Skills[], id: bigint): Observable<Profile>
  {
    return this.http.put<Profile>(`${environment.BackUrl}/profiles/skills/${id}`, skills);
  }

  RemoveSkillsFromProfile(ids: bigint, idp: bigint): Observable<Profile>
  {
    return this.http.delete<Profile>(`${environment.BackUrl}/profiles/skills/${idp}/${ids}/`);
  }

  upExperience(experience: Experience): Observable<Experience>
  {

    return this.http.put<Experience>(`${environment.BackUrl}/profiles/experience/`, experience);
  }

  RemoveExperience(id: bigint): Observable<Experience>
  {

    return this.http.delete(`${environment.BackUrl}/profiles/experience/${id}`);
  }
}
