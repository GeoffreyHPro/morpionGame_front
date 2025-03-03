import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxStompService } from '@stomp/ng2-stompjs';
import { HomeComponent } from './authenticated_section/home/home.component';
import { ListRoomsComponent } from './authenticated_section/home/list-rooms/list-rooms.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListRoomsComponent,
    HomeComponent,
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
