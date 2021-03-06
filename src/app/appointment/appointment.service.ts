import { Injectable } from '@angular/core';
import { AuthHttp } from '../shared/auth-http.service';
import { ApiConfig } from '../../api.config';
import { Headers } from '@angular/http';
import { WebsocketService } from '../shared';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppointmentService {

  public constructor(
    public authHttp: AuthHttp,
    public wsService: WebsocketService
  ) {
  }

  public getAll() {
    return this.authHttp.get(
      ApiConfig.url + '/api/appointment'
    );
  }

  public get(id: string) {
    return this.authHttp.get(
      ApiConfig.url + '/api/appointment/' + id
    );
  }

  public getAggregated() {
    return this.authHttp.get(
      ApiConfig.url + '/api/appointment/aggregated'
    );
  }

  public save(appointment) {
    const method = appointment._id ? 'put' : 'post';

    return this.authHttp[method](
      ApiConfig.url + '/api/appointment' + (appointment._id ? '/' + appointment._id : ''),
      appointment, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public registration(appointment) {
    return this.authHttp.post(
      `${ApiConfig.url}/api/appointment/${appointment._id}/register`,
      '', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Initializes Socket.io client with Jwt and listens to 'appointment'.
   */
  public getSocket(): Observable<any> {
    const websocket = this.wsService.getSocket();

    return Observable.create(obs => {
      websocket.on('appointment', res => obs.next(res));
    });
  }

  public delete(appointment) {
    return this.authHttp.delete(
      ApiConfig.url + '/api/appointment/' + appointment._id, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public deleteRegistration(appointment) {
    return this.authHttp.delete(
      ApiConfig.url + '/api/appointment/remove/' + appointment._id, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public logAppointmentCall() {
    return this.authHttp.post(
      ApiConfig.url + '/api/appointment/call', '', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public toggle(hour: number, day: number) {
    return this.authHttp.post(
      ApiConfig.url + '/api/appointment/toggle', { hour, day }, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public update(oldHour: number, newHour: number) {
    return this.authHttp.post(
      ApiConfig.url + '/api/appointment/update', { oldHour, newHour }, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public getNow(): Observable<any> {
    const websocket = this.wsService.getSocket();
    websocket.emit('appointment:authorize');

    return Observable.create(obs => {
      websocket.on('appointment-data', res => obs.next(res));
    });
  }
}
