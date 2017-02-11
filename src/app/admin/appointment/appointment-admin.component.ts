import { Component } from '@angular/core';
import { AppointmentService } from '../../appointment';
import * as moment from 'moment-timezone';

@Component({
  selector: 'appointment-admin',
  templateUrl: './appointment-admin.html',
  styleUrls: [
    './appointment-admin.styl'
  ]
})
export class AppointmentAdminComponent {

  // appointment data
  appointments: Object[] = [];
  addHours = 0;
  toUpdate = 0;
  updated = 0;
  updating = false;

  // EDT or EST
  zoneName: string = moment.tz('America/Toronto').zoneName();

  constructor(public appointmentService: AppointmentService) {
    this.loadAppointments();
  }

  /**
   * Loads all appointments
   */
  loadAppointments() {
    this.appointmentService
      .getAll()
      .map(res => res.json())
      .map(res => res.appointments)
      .subscribe(res => {
        this.appointments = res;

        for (let app of res) {
          if (app['adjustment']) {
            this.addHours = app['adjustment'];
            // break;
          }
        }
      });
  }

  printWeekDay(weekDay: number): string {
    return moment('' + weekDay, 'e').format('ddd');
  }

  /**
   * Converts hour from number to string.
   * @param  {number} hour EST/EDT hour from DB
   * @return {string}      Local hour in format 'HH:mm'
   */
  printHour(hour: number): string {
    // add increment
    const hourNew = this.calcHour(hour, this.addHours);

    // automatically fills empty space with '0' (i.e. 40 => '0040')
    const hourFormat = Array(5 - hourNew.toString().length).join('0') + hourNew.toString();

    return moment(hourFormat, 'HHmm').format('HH:mm');
  }

  calcHour(hour: number, increment: number): number {
    const calculated = (hour + increment * 100);

    return calculated < 0 || calculated > 2359 ? 0 : calculated;
  }

  delete(evt, appointment) {
    evt.preventDefault();

    if (!confirm('Are you sure?')) {
      return;
    }

    this.appointmentService
      .delete(appointment)
      .subscribe(() => this.loadAppointments());
  }

  // Adds 'addHours' to all appointments
  updateAll() {
    const increment = this.addHours;
    this.updating = true;
    this.updated = 0;
    this.toUpdate = 0;


    // prevent that appointments hours are double increased after updated
    this.addHours = 0;

    for (const appointment of this.appointments) {
      if ('hour' in appointment) {
        this.toUpdate++;
        appointment['adjustment'] = this.addHours;

        this.appointmentService
          .save(appointment)
          .subscribe(
            () => this.updated++,
            err => console.log(err)
          );
      }
    }
  }
}
