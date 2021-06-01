import { Component, Input, OnInit } from '@angular/core';
import { IColleague } from '../tabs-chat.page';

@Component({
  selector: 'app-tabs-chat-interlocutor',
  templateUrl: './tabs-chat-interlocutor.component.html',
  styleUrls: ['./tabs-chat-interlocutor.component.scss'],
})
export class TabsChatInterlocutorComponent implements OnInit {

  @Input() data: IColleague;
  constructor() { }

  ngOnInit() {}

}
