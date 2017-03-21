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

  loadingA: boolean = false;
  loadingB: boolean = false;
  loadingC: boolean = false;

  users;

  countryChart = {
    data: {},
    isReady: false
  };

  timezoneChart = {
    labels: [],
    data: [],
    isReady: false,
    options: {
      title: 'Top 10 timezones'
    }
  };

  signupChart = {
    labels: [],
    datasets: [],
    options: {
      title: {
        display: true,
        text: 'New Users'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    },
    isReady: false
  };

  meditationChart = {
    labels: [],
    datasets: [],
    options: {
      title: {
        display: true,
        text: 'Meditation Sessions'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    },
    isReady: false
  };

  constructor(public analyticsService: AnalyticsService) {
    this.loadUserStats();
  }

  changeTab(evt) {
    if (evt.index === 0) {
      this.loadUserStats();
    } else if (evt.index === 1) {
      this.loadTimezoneStats();
      this.loadCountryStats();
    } else if (evt.index === 2) {
      this.loadHistory();
    }
  }

  loadUserStats() {
    this.loadingA = true;

    this.analyticsService.getUserStats()
      .map(res => res.json())
      .subscribe(res => {
        this.loadingA = false;
        this.users = res;
      });
  }

  setLoadingB() {
    this.loadingB = this.timezoneChart.isReady && this.countryChart.isReady ? true : false;
  }

  setLoadingC() {
    this.loadingC = this.signupChart.isReady && this.meditationChart.isReady ? true : false;
  }

  loadCountryStats() {
    this.loadingB = true;

    this.analyticsService.getCountryStats()
      .map(res => res.json())
      .subscribe(res => {
        this.countryChart.data = res;
        this.setLoadingB();
      });
  }

  loadTimezoneStats() {
    this.loadingB = true;

    this.timezoneChart.labels = [];
    this.timezoneChart.data = [];

    this.timezoneChart.isReady = false;
    this.analyticsService.getTimezoneStats()
      .map(res => res.json())
      .subscribe(res => {
        for(let x of res) {
          this.timezoneChart.labels.push(x._id ? x._id : 'Unknown');
          this.timezoneChart.data.push(x.count);
        }

        this.timezoneChart.isReady = true;
        this.setLoadingB();
      });
  }

  loadSignupStats(minDate = null, interval = null, format = null) {
    this.signupChart.isReady = false;
    this.analyticsService.getSignupStats(minDate, interval, format)
      .map(res => res.json())
      .subscribe(res => {
        this.signupChart.datasets = [{
          label: 'count of new users',
          data: res.data
        }];

        this.signupChart.labels = res.labels;
        this.signupChart.isReady = true;
      });
  }

  loadMeditationStats(minDate = null, interval = null, format = null) {
    this.meditationChart.isReady = false;
    this.analyticsService.getMeditationStats(minDate, interval, format)
      .map(res => res.json())
      .subscribe(res => {
        this.meditationChart.datasets = [{
          label: 'count of meditation sessions',
          data: res.data
        }];

        this.meditationChart.labels = res.labels;
        this.meditationChart.isReady = true;
      });
  }

  loadHistory(minDate = null, interval = null, format = null) {
    this.loadSignupStats(minDate, interval, format);
    this.loadMeditationStats(minDate, interval, format);
  }

  changeHistoryTimespan(evt) {
    if (evt.value === 'month') {
      this.loadHistory(Date.now() - 2592E6);
    } else if (evt.value === 'year') {
      this.loadHistory(Date.now() - 31536E6, 2592E6, 'MMM YY');
    } else {
      this.loadHistory();
    }
  }

}
