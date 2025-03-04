import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInformationsComponent } from './room-informations.component';

describe('RoomInformationsComponent', () => {
  let component: RoomInformationsComponent;
  let fixture: ComponentFixture<RoomInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomInformationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
