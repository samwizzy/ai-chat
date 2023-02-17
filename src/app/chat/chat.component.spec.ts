import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { chatReducer } from '../state/chat.reducer';
import { IMessages } from '../utils/modals/message';
import { ChatService } from '../utils/services/chat.service';

import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let compiled: HTMLElement;
  let de: DebugElement;
  let store: MockStore<{ chat: IMessages[] }>;

  let initialState = { chat: [] };

  let mockChatService;

  beforeEach(async () => {
    mockChatService = jasmine.createSpyObj('chatService', ['sendMessage']);
    mockChatService.sendMessage.and.returnValue(
      of({ userId: 1, cnt: 'Hello world' })
    );

    await TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [FormsModule, StoreModule.forRoot({ chat: chatReducer })],
      providers: [
        { provide: ChatService, useValue: mockChatService },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain logout text', () => {
    expect(
      compiled.querySelector('.logout')?.textContent?.toLowerCase()
    ).toContain('logout');
  });

  it('should contain no messages', (done) => {
    component.chats$.subscribe((val) => {
      expect(val).toEqual([]);
    });
    done();
  });

  it('should contain messages', () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    component.sendMessage();
    fixture.detectChanges();

    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should update chat reducer', (done) => {
    store.setState({ chat: [{ userId: 1, cnt: 'Hello' }] });

    store.select('chat').subscribe((data) => {
      expect(data.length).toEqual(1);
    });
    done();
  });

  it('should have an empty input', () => {
    let inputEl = compiled.querySelector('.input-el') as HTMLInputElement;
    let btnEl = compiled.querySelector('.btn') as HTMLButtonElement;

    expect(inputEl?.value?.length).toEqual(0);
    expect(btnEl?.disabled).toBeTruthy();
  });

  it('should not have an empty input', () => {
    let btnEl = compiled.querySelector('.btn') as HTMLButtonElement;

    component.message = 'Hello';

    fixture.detectChanges();
    expect(btnEl?.disabled).toBeFalsy();
  });
});
