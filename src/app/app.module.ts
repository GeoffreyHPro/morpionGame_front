import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxStompService } from '@stomp/ng2-stompjs';
import { HomeComponent } from './authenticated_section/home/home.component';
import { ListRoomsComponent } from './authenticated_section/home/list-rooms/list-rooms.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeUnauthenticatedComponent } from './unauthenticated_section/home-unauthenticated/home-unauthenticated.component';
import { LoginComponent } from './unauthenticated_section/home-unauthenticated/login/login.component';
import { SignupComponent } from './unauthenticated_section/home-unauthenticated/signup/signup.component';
import { UserSectionComponent } from './authenticated_section/user-section/user-section.component';

@NgModule({
  declarations: [
    AppComponent,
    ListRoomsComponent,
    HomeComponent,
    HomeUnauthenticatedComponent,
    LoginComponent,
    SignupComponent,
    UserSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    RxStompService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
