import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { sendMessage, clearChats } from '../state/chat.actions';
import { delay, Observable, of } from 'rxjs';
import { ChatResponse, IMessages } from '../utils/modals/message';
import { ChatService } from '../utils/services/chat.service';
import { fadeIn } from '../utils/triggers/fadeIn';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [fadeIn],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  userId = this.chatService.userId;
  botId = this.chatService.botId;

  chats$: Observable<IMessages[]> = of([]);
  message: string = '';
  @ViewChild('scrollToBottom') private scrollContainer!: ElementRef;

  constructor(
    private store: Store<{ chat: IMessages[] }>,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.scrollToBottom();
    this.chats$ = this.store.select('chat');
    this.store.select('chat').subscribe((chatState) => {});
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage(): void {
    this.store.dispatch(
      sendMessage({ userId: this.userId, cnt: this.message })
    );

    this.chatService
      .sendMessage(this.message)
      .pipe(delay(2000))
      .subscribe((data) => {
        this.store.dispatch(sendMessage({ userId: this.botId, cnt: data.cnt }));
      });

    this.message = '';
  }

  trackByFn(index: number, message: ChatResponse) {
    return message.cnt + index;
  }

  refresh() {
    this.store.dispatch(clearChats());
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
