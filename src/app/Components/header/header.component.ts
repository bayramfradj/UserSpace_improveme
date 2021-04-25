import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name?: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUserProfile().then(data => {
      this.name = data.firstName;
      this.name += ' ' + data.lastName;
    });
  }

  logout(): void{
    this.auth.logout(document.baseURI);
  }
}
