import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ComponentFixture,tick } from '@angular/core/testing';

function createEvent(eventType: any): Event {
  const evt: Event = document.createEvent('Event');
  evt.initEvent(eventType, true, true);
  return evt;
}

export class TestHelper {
  public static fakeResponse(json: {} = {}) {
    return Observable.create(obs => {
      obs.next(
        new Response(
          new ResponseOptions({
            body: json
          })
        )
      );
      obs.complete();
    });
  }

  public static noRespose() {
    return Observable.create(() => {
    });
  }

  public static dispatchEvent(element: any, eventType: any) {
    element.dispatchEvent(createEvent(eventType));

  }

  public static tick(fixture:ComponentFixture<any>) {
    fixture.detectChanges();
    tick();
  }
  /**
   * Tell Angular to digest the dom values
   * @param fixture
   * @param inputs  have to be native-dom
   * @returns {Promise<any>}
   */
  public static sendInputs(fixture: ComponentFixture<any>, inputs: Array<any>) {
    inputs.forEach(input => {
      this.dispatchEvent(input, 'input');
    });
    fixture.detectChanges();
    return fixture.whenStable();
  };

  /**
   * tell Angular to update html after changing component member
   * @param fixture
   * @returns {Promise<any>}
   */
  public static advance(fixture: ComponentFixture<any>) {
    fixture.detectChanges();
    return fixture.whenStable();
  }
}
