import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../model/room';
import {environment} from '../../environments/environment';
import {Message} from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  public SaveRoom(room: Room): Observable<Room>
  {
    return this.http.post<Room>(`${environment.BackUrl}:8085/Rooms/`, room);
  }

  public GetRoomByGroupeId(groupeId: bigint | undefined): Observable<Room>
  {
    return this.http.get<Room>(`${environment.BackUrl}:8085/Rooms/${groupeId}`);
  }

  public GetMessagesByRoomId(roomId: bigint | undefined): Observable<Message[]>
  {
    return this.http.get<Message[]>(`${environment.BackUrl}:8085/Rooms/messages/${roomId}`);
  }

  public SendMessage(message: Message, roomId: bigint): Observable<Message>
  {
    return this.http.post<Message>(`${environment.BackUrl}:8085/Rooms/Messages/${roomId}`, message);
  }

  public GetLastMessagesByRoomId(roomId: bigint | undefined): Observable<Message>
  {
    return this.http.get<Message>(`${environment.BackUrl}:8085/Rooms/messages/Last/${roomId}`);
  }
}
