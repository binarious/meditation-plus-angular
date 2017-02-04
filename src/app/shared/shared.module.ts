import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkyPipe } from 'angular2-linky';
import { WebsocketService } from './websocket.service';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    LinkyPipe
  ],
  providers: [
    WebsocketService
  ],
  exports: [
    CommonModule,
    LinkyPipe
  ]
})
export class SharedModule { }
