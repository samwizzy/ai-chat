import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ChatService } from './utils/services/chat.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  const chatServiceStub: ChatService = jasmine.createSpyObj(ChatService, {
    sendMessage: of({ userId: 1, cnt: 'Hi' }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: ChatService, useValue: chatServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call function once', () => {
    let logSpy = spyOn(app, 'log').and.callThrough();
    let saySmtSpy = spyOn(app, 'saySomething').and.callThrough();

    app.saySomething();

    expect(logSpy).toHaveBeenCalled();
    expect(saySmtSpy).toHaveBeenCalledTimes(1);
    expect(chatServiceStub.sendMessage).toHaveBeenCalledTimes(1);
  });
});
