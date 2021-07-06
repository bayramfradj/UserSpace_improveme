import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Groupe} from '../model/groupe';
import {Membre} from '../model/membre';
import {environment} from '../../environments/environment';
import {Evaluation} from '../model/evaluation';
import {Response} from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient) {}

  public AddGroup(group: Groupe): Observable<Groupe>
  {
    return this.http.post<Groupe>(`${environment.BackUrl}:8084/Groupes/`, group);
  }

  public UpGroup(group: Groupe): Observable<Groupe>
  {
    return this.http.put<Groupe>(`${environment.BackUrl}:8084/Groupes/`, group);
  }

  public ArchiveGroup(groupe: Groupe): Observable<Groupe>
  {
    return this.http.put<Groupe>(`${environment.BackUrl}:8084/Groupes/${groupe.id}`, null);
  }

  public AddMemberToGroup(groupeId: bigint, m: Membre): Observable<Membre>
  {
    return this.http.post<Membre>(`${environment.BackUrl}:8084/Groupes/${groupeId}/Members/`, m);
  }

  public DeleteMember(membreId: bigint): Observable<boolean>
  {
    return this.http.delete<boolean>(`${environment.BackUrl}:8084/Groupes/Members/${membreId}`);
  }

  public AllByUserId(userId: string): Observable<Groupe[]>
  {
    return this.http.get<Groupe[]>(`${environment.BackUrl}:8084/Groupes/ByUser/${userId}`);
  }

  public AddEvalution(evaluation: Evaluation): Observable<Evaluation>
  {
    return this.http.post<Evaluation>(`${environment.BackUrl}:8084/Evaluation/`, evaluation);
  }

  public UpEvalution(evaluation: Evaluation): Observable<Evaluation>
  {
    return this.http.put<Groupe>(`${environment.BackUrl}:8084/Evaluation/`, evaluation);
  }

  public RemoveEvalution(evaluation_id: bigint): Observable<boolean>
  {
    return this.http.delete<boolean>(`${environment.BackUrl}:8084/Evaluation/${evaluation_id}`);
  }

  public GetEvalutionById(evaluation_id: bigint): Observable<Evaluation>
  {
    return this.http.get<Evaluation>(`${environment.BackUrl}:8084/Evaluation/${evaluation_id}`);
  }

  public GetEvalutionByMissionId(evaluation_id: bigint): Observable<Evaluation[]>
  {
    return this.http.get<Evaluation[]>(`${environment.BackUrl}:8084/Evaluation/Mission/${evaluation_id}`);
  }

  public AddResponse(response: Response): Observable<Response>
  {
    return this.http.post<Groupe>(`${environment.BackUrl}:8084/Evaluation/Response/`, response);
  }

  public UpResponse(response: Response): Observable<Response>
  {
    return this.http.put<Groupe>(`${environment.BackUrl}:8084/Evaluation/Response/`, response);
  }

  public GetResponseById(response_id: bigint): Observable<Response>
  {
    return this.http.get<Response>(`${environment.BackUrl}:8084/Evaluation/Response/${response_id}`);
  }

  public RemoveResponseById(response_id: bigint): Observable<boolean>
  {
    return this.http.delete<boolean>(`${environment.BackUrl}:8084/Evaluation/Response/${response_id}`);
  }

  public GetResponseByGroupeIdAndEval(groupeId: bigint, evalId: bigint): Observable<Response>
  {
    return this.http.delete<Response>(`${environment.BackUrl}:8084/Evaluation/Response/Groupe/${groupeId}/${evalId}`);
  }





}
