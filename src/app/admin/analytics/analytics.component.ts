import { Component } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import * as chart from 'chart.js';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: [
    './analytics.component.styl'
  ]
})
export class AnalyticsComponent {

  loading: boolean = false;

  users;
  countries;
  timezones;
  timezoneChart = {
    labels: [],
    data: [],
    backgroundColor: ['#123123', '#456456'],
    isReady: false
  };

  constructor(public analyticsService: AnalyticsService) {
    analyticsService.getUserStats()
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.users = res;
      });

    analyticsService.getTimezoneStats()
      .map(res => res.json())
      .subscribe(res => {
        for(let x of res) {
          this.timezoneChart.labels.push(x._id);
          this.timezoneChart.data.push(x.count);
        }

        this.timezoneChart.isReady = true;
      });
  }

    // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
