import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MissionService} from '../../../Services/mission.service';
import {Mission} from '../../../model/mission';
import { TypeMission } from 'src/app/model/type-mission.enum';

@Component({
  selector: 'app-show-mission',
  templateUrl: './show-mission.component.html',
  styleUrls: ['./show-mission.component.css']
})
export class ShowMissionComponent implements OnInit {
  missionId: bigint;
  // @ts-ignore
  mission: Mission;
  loaded = false;
  readonly TypeMission = TypeMission;
  constructor(private route: ActivatedRoute, private msService: MissionService) {
    this.missionId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.msService.getMission(this.missionId).subscribe(ms => {
      this.mission = ms;
      this.loaded = true;
    })
  }

}
