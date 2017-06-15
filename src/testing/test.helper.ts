import {Response, ResponseOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {DebugElement} from "@angular/core";
import {ComponentFixture} from '@angular/core/testing';

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

  public static sendInputs(fixture: ComponentFixture<any>, inputs: Array<any>)
  // inputs has to be native element, useful to test forms
  {
    inputs.forEach(input => {
      this.dispatchEvent(input, 'input');
    });
    fixture.detectChanges();
    return fixture.whenStable();
  };
}
