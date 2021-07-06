import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../Services/profile.service';
import {AuthService} from '../../Services/auth.service';
import {Profile} from '../../model/profile';
import { Experience } from '../..//model/experience';
import { Skills } from 'src/app/model/skills';
import {SkillsService} from '../../Services/skills.service';
import {ToastrService} from 'ngx-toastr';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   userProfile = new Profile();
   newExperience = new Experience();
   upExperience = new Experience();
   file: any ;
   img: any;
   loadedskills = new Skills();
   keyword = '';
   allSkills: Skills[] = [];
   filtredSkills: Skills[] = [];
   addedSkills: Skills[] = [];
   loadPage = false;

  constructor(private prService: ProfileService, private auth: AuthService,
              private skService: SkillsService, private toastr: ToastrService,
              private af: AngularFireStorage ) {
  }

  ngOnInit(): void {

    this.loadProfile();
    this.skService.getAll().subscribe(value => {
      this.allSkills = value;
    });
  }

  loadProfile(): void
  {
    this.prService.getProfile(this.auth.getLoggedUser()?.sub).toPromise().then(value => {
      console.log('user profile', value);
      this.userProfile = value;
      this.img = this.userProfile.img ;
      this.loadPage = true;
    });
  }

  updateUser(): void {
    this.loadPage = false;
    this.prService.upProfile(this.userProfile).subscribe(value => {
      console.log('success :', value);
      this.toastr.success( 'Profil Modifié avec succès' , 'SUCCÈS' );
      this.loadPage = true;
    }, error => {
      this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      console.log('errreur up : ', error.message);
    });
  }

  addExperience(): void {
    if (this.userProfile.id != null) {
      console.log('data :', JSON.stringify( this.newExperience));
      this.prService.addExperience(this.newExperience, this.userProfile.id).subscribe(value => {
        console.log('experience added :', value);
        this.newExperience = new Experience();
        this.toastr.success( 'Experience ajoutée avec succès' , 'SUCCÈS' );
        this.loadProfile();
      },
      error => {
        console.log('erreur add ', error);
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');

      });
    }
  }

  loadUpEx(experience: Experience): void {
    this.upExperience = experience;
  }

  updateExperience(): void{
    this.prService.upExperience(this.upExperience).subscribe(
      value => {
        console.log('success update : ', value);
        this.loadProfile();
      },
      error => {
        console.log('erreur up ex :', error);
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');

      }
    );
  }

  RemoveExperience(): void {
    if (this.upExperience.id != null) {
      this.prService.RemoveExperience(this.upExperience.id).subscribe(
        value => {
          this.loadProfile();
        },
        error => {
          console.log('erreur remove : ', error);
          this.toastr.error('Réessayer Ultérieurement', 'ERREUR');

        }
      );
    }
  }

  removeFromList(skills: Skills): void{
    this.addedSkills.splice(this.addedSkills.indexOf(skills), 1);
  }

  addSkills(skills?: Skills ): void {
      if (skills)
      {
        if ( this.isValid(skills.name , this.addedSkills) ){
          this.addedSkills.push(skills);
          this.keyword = '';
          this.filtredSkills = [];
        }
      }
      else {
        if (this.isValid(this.keyword, this.addedSkills) && this.isValid(this.keyword, this.allSkills)){
          this.addedSkills.push({name : this.keyword});
          this.keyword = '';
          this.filtredSkills = [];
        }
      }
  }

  filterSkills($event: KeyboardEvent): void {
     if ($event.key === 'Enter' ){
        this.addSkills();
     }
     else {
       this.filtredSkills = this.keyword.length > 0 ? this.allSkills.filter(s => {
         // @ts-ignore
         return  s.name?.toUpperCase().indexOf(this.keyword.toUpperCase()) > -1 ;
       }) : [];
     }
  }

  isValid(keyword: string| undefined, arr: Skills[]): boolean
  {
    return !(arr.filter(value => {
                        return value.name?.toUpperCase() === keyword?.toUpperCase();
                        }).length > 0);
  }

  addskillstoProfile(): void
  {
    if (this.userProfile.id != null) {
      this.prService.addSkillsToProfile(this.addedSkills, this.userProfile.id).subscribe(value => {
        console.log('result add skills', value);
        this.userProfile = value;
        this.addedSkills = [];
        this.toastr.success( 'Compétence Modifiée avec succès' , 'SUCCÈS' );
      }, error => {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');

      });
    }
  }

  loadSkills(sk: Skills): void
  {
    this.loadedskills = sk;
  }

  RemoveSkills(): void
  {
    if (this.userProfile.id != null && this.loadedskills.id != null) {
      this.prService.RemoveSkillsFromProfile(this.loadedskills.id, this.userProfile.id).subscribe(value => {
        console.log('result rm skills', value);
        this.userProfile = value;
      }, error => {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      });
    }
  }

  loadImage($event: any): void
  {
    this.file = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.img = reader.result;
    };
  }

  UploadImage(): void
  {
    const randomId = Math.random().toString(36).substring(2);
    const ref = this.af.ref(randomId);
    const task = ref.put(this.file);
    task.then(a => {
      a.ref.getDownloadURL().then(value => {
        console.log(value);
        this.img = value;
        this.userProfile.img = value;
        this.updateUser();
      });
    });
  }
}
