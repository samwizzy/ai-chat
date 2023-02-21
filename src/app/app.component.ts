import { Component, OnInit } from '@angular/core';
import { ChatService } from './utils/services/chat.service';
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ai_chat';
  userId: number = 0;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    gtag();
  }

  saySomething() {
    this.chatService.sendMessage('message').subscribe((res) => {
      console.log(res, 'hello');
    });
    this.log();
  }

  log() {
    console.log('I have logged your message');
  }
}
