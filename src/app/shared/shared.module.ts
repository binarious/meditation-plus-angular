import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkyPipe } from 'angular2-linky';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LinkyPipe
  ],
  exports: [
    CommonModule,
    LinkyPipe
  ]
})
export class SharedModule { }
