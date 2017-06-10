import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageComponent} from './message.component';
import {FakeMessageService} from './testing/fake-message.service';
import {MessageService} from './message.service';
import {UserService} from '../user/user.service';
import {FakeUserService} from '../user/testing/fake-user.service';
import {WebsocketService} from '../shared/websocket.service';
import {FakeWebsocketService} from '../shared/testing/fake-websocket.service';
import {MockComponent} from '../../testing/mock-component';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from '@angular/material';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule,
        FormsModule,//for ngModel attribute
        NoopAnimationsModule
      ],
      declarations: [MessageComponent,
        MockComponent({selector: 'emoji-select'}),
        MockComponent({selector: 'message-list-entry', inputs: ['message', 'admin', 'menuOpen']}),
      ],
      providers: [
        {provide: MessageService, useClass: FakeMessageService},
        {provide: WebsocketService, useClass: FakeWebsocketService},
        {provide: UserService, useClass: FakeUserService}]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelectorAll('.message-row').length
    ).toBe(3);

    expect(
      compiled.querySelector('button[type="submit"]').disabled
    ).toBe(true);
  });
});
