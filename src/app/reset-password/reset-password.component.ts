import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: [
    './reset-password.component.styl'
  ]
})

export class ResetPasswordComponent implements OnInit {

  message: string;
  error: string;
  loading: boolean;

  email: string;
  userId: string;
  token: string;

  password: string;
  password2: string;

  constructor(
    public userService: UserService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['user'];
    this.token = this.route.snapshot.params['auth'];
    this.email = this.route.snapshot.params['email'];
  }

  sendMail(evt) {
    evt.preventDefault();

    if (!this.email) {
      return;
    }

    this.loading = true;

    this.userService.resetPasswordInit(this.email)
      .subscribe(
        () => this.message = 'An email with instructions has been send to your account.',
        err => this.error = err.text(),
        () => this.loading = false
      );
  }

  resetPassword(evt) {
    evt.preventDefault();

    if (!this.userId || this.password !== this.password2) {
      return;
    }

    this.loading = true;

    this.userService.resetPassword(this.userId, this.token, this.password)
      .subscribe(
        () => this.message = 'Password was changed successfully.',
        err => this.error = err.text(),
        () => this.loading = false
      );
  }
}
