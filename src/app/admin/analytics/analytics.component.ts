import { Component } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: [
    './analytics.component.styl'
  ]
})
export class AnalyticsComponent {

  users;
  countries;
  timezones;

  constructor(public analyticsService: AnalyticsService) {}

}
