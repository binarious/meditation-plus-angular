import { UserTextListModule } from './../user-text-list/user-text-list.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { TestimonialComponent } from './testimonial.component';
import { EmojiModule } from '../emoji';
import { ProfileModule } from '../profile';

@NgModule({
  imports: [
    SharedModule,
    ProfileModule,
    FormsModule,
    RouterModule,
    EmojiModule,
    UserTextListModule
  ],
  declarations: [
    TestimonialComponent
  ],
  exports: [
    TestimonialComponent
  ]
})
export class TestimonialModule { }
