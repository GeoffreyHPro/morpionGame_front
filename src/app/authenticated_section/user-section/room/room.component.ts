import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  roomId!: string | null;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.roomId = this.activatedRoute.snapshot.paramMap.get("roomId");
  }
}
