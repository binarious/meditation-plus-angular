import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { FakeMessageService } from './testing/fake-message.service';
import { MessageService } from './message.service';
import { UserService } from '../user/user.service';
import { FakeUserService } from '../user/testing/fake-user.service';
import { WebsocketService } from '../shared/websocket.service';
import { FakeWebsocketService } from '../shared/testing/fake-websocket.service';
import { MockComponent } from '../../testing/mock-component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@angular/material';
import { TestHelper } from '../../testing/test.helper';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule
      ],
      declarations: [MessageComponent,
        MockComponent({selector: 'emoji-select'}),
        MockComponent({selector: 'message-list-entry', inputs: ['message', 'admin', 'menuOpen']}),
      ],
      providers: [
        {provide: MessageService, useClass: FakeMessageService},
        {provide: WebsocketService, useClass: FakeWebsocketService},
        {provide: UserService, useClass: FakeUserService}
      ]
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
  });

  it('should have 3 messages', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelectorAll('.message-row').length
    ).toBe(3);
  });

  it('should have disabled submit button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('button[type="submit"]').disabled
    ).toBe(true);
  });

  it('should send message to service', () => {
    const compiled = fixture.debugElement.nativeElement;

    const mockService =
      fixture.debugElement.injector.get<any>(MessageService) as FakeMessageService;
    const spy = spyOn(mockService, 'post').and.callThrough();

    const input = compiled.querySelector('textarea');
    input.value = '##HELLO_GOODBYE##';

    TestHelper.sendInputs(fixture, [input]).then(() => {
      expect(
        compiled.querySelector('button[type="submit"]').disabled
      ).toBe(false);  // expect user can click submit button

      // simulate submit
      const form = compiled.querySelector('form');
      TestHelper.dispatchEvent(form, 'submit');

      // the service function is called with currentMessage
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.argsFor(0)).toEqual(['##HELLO_GOODBYE##']);
    });
  });

});
