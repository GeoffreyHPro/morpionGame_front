import { Component } from '@angular/core';
import { UserInformationService } from '../../../service/user-information.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string = "";
  
  constructor(private userInformationService: UserInformationService) { }

  ngOnInit() {
    this.userInformationService.getUsername().subscribe(
      response => {
        this.username = response.body!.name;
      }
    )
  }
}
