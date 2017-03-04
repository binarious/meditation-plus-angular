import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { ApiConfig } from '../../../api.config';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AnalyticsService {

  public constructor(
    public authHttp: AuthHttp
  ) {
  }

  public getUserStats() {
    return this.authHttp.get(
      ApiConfig.url + '/api/analytics-users'
    );
  }

  public getSignupStats(minDate: Date = null, interval: Number = null) {
    return this.authHttp.post(
      ApiConfig.url + '/api/analytics-signups',
      JSON.stringify({ minDate: minDate, interval: interval }), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  public getCountryStats() {
    return this.authHttp.get(
      ApiConfig.url + '/api/analytics-countries'
    );
  }

  public getTimezoneStats() {
    return this.authHttp.get(
      ApiConfig.url + '/api/analytics-timezones'
    );
  }

}
