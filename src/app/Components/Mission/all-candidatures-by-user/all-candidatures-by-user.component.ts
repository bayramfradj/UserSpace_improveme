import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Services/auth.service';
import {DemandeService} from '../../../Services/demande.service';
import {Demande} from '../../../model/demande';
import {StateMission} from '../../../model/state-mission.enum';
import {StateCandidature} from '../../../model/state-candidature.enum';
import {TypeDemende} from '../../../model/type-demende.enum';

@Component({
  selector: 'app-all-candidatures-by-user',
  templateUrl: './all-candidatures-by-user.component.html',
  styleUrls: ['./all-candidatures-by-user.component.css']
})
export class AllCandidaturesByUserComponent implements OnInit {
  demandes: Demande[] =[];
  error = false;
  loaded = false;
  readonly StateMission =  StateMission;
  readonly StateCandidature =  StateCandidature;
  constructor(private auth: AuthService, private dmService: DemandeService) { }

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void
  {
    this.dmService.AllCandidaturesByUserId(this.auth.getLoggedUser()?.sub).subscribe(value => {
      console.log('Candidatures',value);
      this.demandes = value.filter(d => d.typeDemende === TypeDemende.CANDIDATURE);
      this.loaded = true;
    }, error => {
      console.log(error);
      this.error = true;
    })
  }

}
