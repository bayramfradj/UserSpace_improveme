import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MissionService} from '../../../Services/mission.service';
import {EvaluationService} from '../../../Services/evaluation.service';
import {Mission} from '../../../model/mission';
import {CalendarOptions, EventSourceInput} from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import {Groupe} from '../../../model/groupe';
import {AuthService} from '../../../Services/auth.service';


@Component({
  selector: 'app-all-evaluation',
  templateUrl: './all-evaluation.component.html',
  styleUrls: ['./all-evaluation.component.css']
})
export class AllEvaluationComponent implements OnInit {
  missionId: bigint;
  loaded = false;
  groupe: Groupe | null = null;
  userId?: string;

  // @ts-ignore
  mission: Mission;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale:  frLocale,
    eventClick: this.handleEventClick.bind(this),
    eventColor: '#0e0c28',
    eventTextColor: '#ffffff',
    eventBackgroundColor: '#0e0c28',
    headerToolbar: {
      right: 'today,dayGridMonth,timeGridWeek',
      center: 'title',
      left: 'prev,next'
    },
    footerToolbar: {
      left: '',
      center: 'prev,next',
      right: ''
    },
  };

  constructor(private route: ActivatedRoute, private mService: MissionService,
              private evService: EvaluationService, private router: Router, private auth: AuthService) {
    this.missionId = this.route.snapshot.params.id;
    this.userId = this.auth.getLoggedUser()?.sub;
  }

  ngOnInit(): void {
    this.mService.getMission(this.missionId).subscribe(async m => {
      this.mission = m;
      console.log(m);
      await this.evService.AllByUserIdAndMission(this.userId , this.missionId).subscribe(async g => {
        console.log('groupe', g);
        this.groupe = g;
        this.loaded = true;


      })
    });
    this.evService.GetEvalutionByMissionId(this.missionId).subscribe(res => {
      const data: EventSourceInput  = [];
      let itemProsseced = 0;
      res.forEach(e => {
        // @ts-ignore
        data.push({
          title: e.title,
          start: new Date(e.startDate).toISOString().slice(0,16),
          end: new Date(e.endDate).toISOString().slice(0,16),
          id: e.id?.toString() ,
        });
        itemProsseced++;
        if (itemProsseced === res.length)
        {
          this.calendarOptions.events = data;
        }
      });
    });


  }


  handleEventClick(info: any): void
  {
    this.router.navigate([`/Mission/Evaluation/Show/${info.event.id}`]);
  }

}
