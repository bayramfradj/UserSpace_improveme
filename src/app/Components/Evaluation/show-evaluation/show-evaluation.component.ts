import { Component, OnInit } from '@angular/core';
import {Evaluation} from '../../../model/evaluation';
import {Mission} from '../../../model/mission';
import {ActivatedRoute, Router} from '@angular/router';
import {EvaluationService} from '../../../Services/evaluation.service';
import {ToastrService} from 'ngx-toastr';
import {MissionService} from '../../../Services/mission.service';
import {Groupe} from '../../../model/groupe';
import {AuthService} from '../../../Services/auth.service';
import {Response} from '../../../model/response';
import {AngularFireStorage} from '@angular/fire/storage';
import {TypeRes} from '../../../model/type-res.enum';

@Component({
  selector: 'app-show-evaluation',
  templateUrl: './show-evaluation.component.html',
  styleUrls: ['./show-evaluation.component.css']
})
export class ShowEvaluationComponent implements OnInit {
  evalId: bigint;
  evaluation?: Evaluation ;
  loader = true;
  mission$: Mission | undefined;
  groupe: Groupe | null = null;
  userId?: string;
  rep?: Response;
  name?: string;
  file: any;
  fileName ='';
  readonly TypeRes = TypeRes;

  constructor(private route: ActivatedRoute,private auth: AuthService, private evService: EvaluationService,
              private router: Router,  private toastr: ToastrService, private msService: MissionService,
              private af: AngularFireStorage ) {
    this.evalId = route.snapshot.params.id;
    this.userId = this.auth.getLoggedUser()?.sub;
    this.auth.getUserProfile().then(value => {
      this.name = value.firstName;
      this.name += ' ' + value.lastName;
    });

  }

  ngOnInit(): void {

    this.evService.GetEvalutionById(this.evalId).subscribe(async data => {
      this.evaluation = data;
      this.evaluation.startDate = new Date(data.startDate).toISOString().slice(0,16);
      this.evaluation.endDate = new Date(data.endDate).toISOString().slice(0,16);
      console.log('rep verif date', this.verifDate(data.endDate));
      if (data.missionId != null) {
        await this.msService.getMission(data.missionId).subscribe(m => {
          this.mission$ = m;
        });
        await this.evService.AllByUserIdAndMission(this.userId , data.missionId).subscribe(async g => {
          console.log('groupe', g);
          this.groupe = g;
          if (g.id != null) {
            await this.evService.GetResponseByGroupeIdAndEval(g.id, this.evalId).subscribe(r => {
              console.log('rep',r);
              this.rep = r;
            });
          }
        })

      }
      this.loader = false;
    });
  }


  UploadRep(): void
  {
    this.loader = true;
    const randomId = Math.random().toString(36).substring(2);
    const ref = this.af.ref(randomId);
    const task = ref.put(this.file);
    task.then(a => {
      a.ref.getDownloadURL().then(value => {
        this.evService.AddResponse({
          userId: this.userId,
          userName: this.name,
          groupeId: this.groupe?.id,
          path: value,
          isValidated: false,
          submitDate: new Date().toISOString()
        }, this.evalId).subscribe(value => {
          console.log('rep', value );
          this.toastr.success( 'Réponse envoyée avec succès' , 'SUCCÈS' );
          this.rep = value;
          this.loader = false;

        },error => {
          this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
          this.loader = false;

        })
      }).catch(reason => {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
        this.loader = false;
      });
    });
  }

  loadFile($event: any): void
  {
    this.file = $event.target.files[0];
    this.fileName = $event.target.files[0]['name'];
    /*const reader = new FileReader();
    reader.readAsDataURL(this.file);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.img = reader.result;
    };*/
  }

  removeFile() : void
  {
    this.file = undefined;
    this.fileName = '';

  }

  HandleClickRmRep(): void
  {
    // @ts-ignore
    this.evService.RemoveResponseById(this.rep?.id).subscribe(value => {
      if (value)
      {
        this.toastr.success( 'Réponse supprimée avec succès' , 'SUCCÈS' );
        this.rep = undefined;
      }
      else {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      }
    }, error => {
      this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
    })
  }

  verifDate(endDay: string): boolean
  {
    return  new Date(endDay).getTime() >=  new Date().getTime();
  }



}
