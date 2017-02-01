// Angular 2
import {
  enableDebugTools,
  disableDebugTools
} from '@angular/platform-browser';
import {
  ApplicationRef,
  enableProdMode
} from '@angular/core';
/*+++*/
import { UserService } from '../app/user/user.service';
import { MessageService } from '../app/message/message.service';
import { QuestionService } from '../app/question/question.service';
import { CommitmentService } from '../app/commitment/commitment.service';
import { MeditationService } from '../app/meditation/meditation.service';
import { LiveService } from '../app/live/live.service';
import { AppointmentService } from '../app/appointment/appointment.service';
import { TestimonialService } from '../app/testimonial';
import { AuthGuard } from '../app/auth-guard';
import { LoginGuard } from '../app/login-guard';
import { AdminGuard } from '../app/admin-guard';
import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';
// +++? import { Title } from '@angular/platform-browser';
// +++? import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
/*+++*/
// Environment Providers
let PROVIDERS: any[] = [
  /*+++*/
  UserService,
  MessageService,
  QuestionService,
  MeditationService,
  CommitmentService,
  AppointmentService,
  TestimonialService,
  LiveService,
  AuthGuard,
  LoginGuard,
  AdminGuard,
  // Title,
  AUTH_PROVIDERS
  /*+++*/
  // +++?  { provide: LocationStrategy, useClass: PathLocationStrategy }
  // common env directives
];

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
let _decorateModuleRef = <T>(value: T): T => { return value; };

if ('production' === ENV) {
  enableProdMode();

  // Production
  _decorateModuleRef = (modRef: any) => {
    disableDebugTools();

    return modRef;
  };

  PROVIDERS = [
    ...PROVIDERS,
    // custom providers in production
  ];

} else {

  _decorateModuleRef = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    let _ng = (<any> window).ng;
    enableDebugTools(cmpRef);
    (<any> window).ng.probe = _ng.probe;
    (<any> window).ng.coreTokens = _ng.coreTokens;
    return modRef;
  };

  // Development
  PROVIDERS = [
    ...PROVIDERS,
    // custom providers in development
  ];

}

export const decorateModuleRef = _decorateModuleRef;

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
