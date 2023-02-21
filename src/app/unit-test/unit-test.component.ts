import { Component, OnInit } from '@angular/core';
import { ChatService } from '../utils/services/chat.service';

@Component({
  selector: 'app-unit-test',
  templateUrl: './unit-test.component.html',
  styleUrls: ['./unit-test.component.scss'],
})
export class UnitTestComponent implements OnInit {
  constructor(private chat: ChatService) {}

  ngOnInit(): void {}

  hello() {
    this.chat.sendMessage('hi');
  }
}
