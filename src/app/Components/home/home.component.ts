import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {ProfileService} from '../../Services/profile.service';
import {Profile} from '../../model/profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private prService: ProfileService) { }

  ngOnInit(): void {
    this.prService.getProfile(this.auth.getLoggedUser()?.sub).toPromise().catch(reason => {
      this.auth.getUserProfile().then(data => {
        const profile: Profile = {
          userId: this.auth.getLoggedUser()?.sub,
          name: `${data.firstName} ${data.lastName}`,
          img: `https://ui-avatars.com/api/?name=${data.firstName?.toUpperCase()} ${data.lastName?.toUpperCase()}&bold=true`
        }
        this.prService.addProfile(profile).subscribe(value => {
          console.log(value);
        })
      });
    })
  }

}
