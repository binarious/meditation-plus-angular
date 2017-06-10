import {TestHelper} from '../../../testing/test.helper'
import {Observable} from 'rxjs/Rx';
import {Message} from '../message';
export class FakeMessageService {

  public constructor() {
  }

  public getRecent(page = 0): Observable<any> {
    return TestHelper.fakeResponse([{
      _id: '123',
      text: 'MyMessage',
      createdAt: '',
    }, {
      _id: '124',
      text: 'Another Message',
      createdAt: '',
    },
      {
        _id: '125',
        text: 'Last Message',
        createdAt: '',
      }])

  }

  public post(message: string): Observable<any> {
    return TestHelper.noRespose()
  }

  public update(message: Message): Observable<any> {
    return TestHelper.noRespose()
  }

  public delete(message: Message): Observable<any> {
    return TestHelper.noRespose()
  }

  public synchronize(timeFrameStart: Date, timeFrameEnd: Date, countOnly: Boolean = false): Observable<any> {
    return TestHelper.noRespose()
  }

  public getUpdateSocket(): Observable<any> {
    return TestHelper.noRespose()
  }

  /**
   * Save the datetime last received message to local storage
   */
  public setLastMessage(messageDate) {
    return messageDate;
  }

  /**
   * Get the datetime last received message from local storage
   */
  public getLastMessage() {
    return '';
  }
}
