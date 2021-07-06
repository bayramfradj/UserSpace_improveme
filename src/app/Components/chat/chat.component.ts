import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {DemandeService} from '../../Services/demande.service';
import {Message} from '../../model/message';
import {EvaluationService} from '../../Services/evaluation.service';
import {MissionService} from '../../Services/mission.service';
import {ChatService} from '../../Services/chat.service';
import {Room} from '../../model/room';
import {ToastrService} from 'ngx-toastr';
import {map} from 'rxjs/operators';
import {StompService} from '../../Services/stomp.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  pageLoading = true;
  rooms:any = [];
  // @ts-ignore
  selctedRoom: Room = {messages : []} ;
  name?: string;
  userId?: string;
  messages: Message[] = [];
  message = new Message();
  private stompClient: any;



  constructor(private auth: AuthService, private dmService: DemandeService,
              private evService: EvaluationService,private msService: MissionService,
              private chatS: ChatService, private toastr: ToastrService,
              private stompS: StompService) {
    this.auth.getUserProfile().then(value => {
      this.name = value.firstName;
      this.name += ' ' + value.lastName;
    });
    this.userId = this.auth.getLoggedUser()?.sub;

  }


  ngOnInit(): void {
    this.stompClient = this.stompS.getStompClient();
    this.loadMessageBox();
  }

  loadMessageBox(): void
  {
    if (this.userId != null) {
      this.evService.AllByUserId(this.userId).subscribe( groupes => {
        if ( groupes.length > 0)
        {
          let itemsProcessed = 0;
          groupes.forEach(async groupe => {
            await this.chatS.GetRoomByGroupeId(groupe.id).subscribe(room => {
              this.rooms.push({
                mission : this.msService.getMission(groupe.missionId).pipe(map(value => (value.title))) ,
                room : room });
              this.subscribeChannel(itemsProcessed);
              itemsProcessed++;
              if (itemsProcessed === groupes.length)
              {
                this.loadSelectedRoom(this.rooms[0].room);
                this.pageLoading = false;
              }
            });
          });
        }
        else {
          this.pageLoading = false;
          this.toastr.info('Aucun groupe de discussion', 'Opps !');

        }

      });
    }
  }

  loadSelectedRoom(room: Room): void {
    this.selctedRoom = room;
    if (room.id != null) {
      this.chatS.GetMessagesByRoomId(room.id).subscribe(messages => {
        this.selctedRoom.messages = messages;
        setTimeout(() => {
          // @ts-ignore
          document.getElementById(`m${room.messages[room.messages?.length - 1].id}`)
            .scrollIntoView({ block: 'end', inline: 'nearest'});
        }, 10 );
      });
    }
  }

  subscribeChannel(index: number): void
  {
    const that = this;
    that.stompClient.subscribe(`/chat-room/${that.rooms[index].room.id}`,  (ms: any) => {
      console.log('ws response', ms);
      that.loadMessage(JSON.parse(ms.body), index);
    });
  }

  loadMessage(m: Message, index: number): void
  {
    this.rooms[index].room.messages?.push(m);
    setTimeout(() => {
      // @ts-ignore
      document.getElementById(`m${m.id}`)
        .scrollIntoView({ block: 'end', inline: 'nearest'});
    }, 100 );

  }

  sendMessage(): void {
    const ms = new Message();
    ms.date = Date.now().toString();
    ms.time = Date.now().toString();
    ms.userId = this.userId;
    ms.userName = this.name;
    ms.content = this.message.content;
    if (this.selctedRoom.id != null) {
      this.message = new Message();
      this.chatS.SendMessage(ms, this.selctedRoom.id).subscribe(value => {
        console.log('message envoyé');
      });
    }
  }

}
