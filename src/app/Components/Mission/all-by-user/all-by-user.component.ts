import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../Services/auth.service';
import {DemandeService} from '../../../Services/demande.service';
import {Demande} from '../../../model/demande';
import {TypeMission} from '../../../model/type-mission.enum';

@Component({
  selector: 'app-all-by-user',
  templateUrl: './all-by-user.component.html',
  styleUrls: ['./all-by-user.component.css']
})
export class AllByUserComponent implements OnInit {
  demandes: Demande[] =[];
  error = false;
  loaded = false;
  SelctedButton = 'A';
  readonly TypeMission = TypeMission;
  constructor(private auth: AuthService, private dmService: DemandeService) { }

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void
  {
    this.loaded = false;
    this.SelctedButton = 'A';
    this.dmService.AllAcceptedByUserId(this.auth.getLoggedUser()?.sub).subscribe(value => {
      this.demandes = value;
      this.loaded = true;

    }, error => {
      console.log(error);
      this.error = true;
    })
  }

  loadArchived(): void
  {
    this.loaded = false;
    this.SelctedButton = 'B';

    this.dmService.AllArchivedByUserId(this.auth.getLoggedUser()?.sub).subscribe(value => {
      this.demandes = value;
      this.loaded = true;

    }, error => {
      console.log(error);
      this.error = true;
    })
  }

}
