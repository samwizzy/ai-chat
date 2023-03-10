import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatResponse } from '../modals/message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  userId: number = 1;
  botId: number = 2;

  constructor(private http: HttpClient) {}

  sendMessage(msg: string): Observable<ChatResponse> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    return this.http.get<ChatResponse>(
      `${environment.baseUrl}?bid=${environment.bid}&key=${environment.apiKey}&uid=${this.userId}&msg=${msg}`,
      { headers }
    );
  }
}
