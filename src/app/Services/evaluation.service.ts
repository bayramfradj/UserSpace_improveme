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


  public AllByUserId(userId: string): Observable<Groupe[]>
  {
    return this.http.get<Groupe[]>(`${environment.BackUrl}:8084/Groupes/ByUser/${userId}`);
  }

  public AllByUserIdAndMission(userId: string | undefined, missionId: bigint): Observable<Groupe>
  {
    return this.http.get<Groupe>(`${environment.BackUrl}:8084/Groupes/Mission/ByUser/${userId}/${missionId}`);
  }

  public GetEvalutionById(evaluation_id: bigint): Observable<Evaluation>
  {
    return this.http.get<Evaluation>(`${environment.BackUrl}:8084/Evaluation/${evaluation_id}`);
  }

  public GetEvalutionByMissionId(missionId: bigint): Observable<Evaluation[]>
  {
    return this.http.get<Evaluation[]>(`${environment.BackUrl}:8084/Evaluation/Mission/${missionId}`);

  }

  public AddResponse(response: Response, evalId: bigint): Observable<Response>
  {
    return this.http.post<Groupe>(`${environment.BackUrl}:8084/Evaluation/Response/${evalId}`, response);
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
    return this.http.get<Response>(`${environment.BackUrl}:8084/Evaluation/Response/Groupe/${groupeId}/${evalId}`);
  }





}
