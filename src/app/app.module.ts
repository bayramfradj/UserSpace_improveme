import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { HeaderComponent } from './Components/header/header.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {initializer} from '../AppInit';
import {AuthService} from './Services/auth.service';
import { ProfileComponent } from './Components/profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import { AllByUserComponent } from './Components/Mission/all-by-user/all-by-user.component';
import { AllCandidaturesByUserComponent } from './Components/Mission/all-candidatures-by-user/all-candidatures-by-user.component';
import { ChatComponent } from './Components/chat/chat.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridWeek from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {ShowMissionComponent} from './Components/Mission/show-mission/show-mission.component';
import { AllEvaluationComponent } from './Components/Evaluation/all-evaluation/all-evaluation.component';
import { ShowEvaluationComponent } from './Components/Evaluation/show-evaluation/show-evaluation.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridWeek,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    ProfileComponent,
    AllByUserComponent,
    AllCandidaturesByUserComponent,
    ChatComponent,
    ShowMissionComponent,
    AllEvaluationComponent,
    ShowEvaluationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.configFrireStore),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    ToastrModule.forRoot({ timeOut: 4000,
                                  progressAnimation: 'decreasing',
                                  progressBar: true})
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
