import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatService } from '../utils/services/chat.service';

import { UnitTestComponent } from './unit-test.component';
import { DebugElement } from '@angular/core';

describe('UnitTestComponent', () => {
  let component: UnitTestComponent;
  let fixture: ComponentFixture<UnitTestComponent>;
  let de: DebugElement;
  let chatService: ChatService;
  let spy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UnitTestComponent],
      providers: [ChatService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTestComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    // chatService = de.injector.get(ChatService);
    chatService = TestBed.inject(ChatService);
    spy = spyOn(chatService, 'sendMessage');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sendMessage to have been called', () => {
    component.hello();
    expect(spy).toHaveBeenCalled();
  });
});
