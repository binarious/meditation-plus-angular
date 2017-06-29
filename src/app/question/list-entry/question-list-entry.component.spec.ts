import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionListEntryComponent } from './question-list-entry.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component, OnInit, DebugElement } from '@angular/core';
import { FlagComponent } from '../../profile/flag/flag.component';
import { MaterialModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { LinkyModule } from 'angular-linky';
import { AvatarDirective } from '../../profile/avatar.directive';
import { EmojiModule } from '../../emoji/emoji.module';
import { MeditatedRecentlyDirective } from '../../profile/meditated-recently.directive';
import { QuestionService } from '../question.service';
import { FakeQuestionService } from '../testing/fake-question.service';

@Component({
  template: `
    <question-list-entry [question]="question" [mode]="mode" [isAdmin]="isAdmin">
    </question-list-entry>`
})


class TestHostComponent implements OnInit {
  question: any;
  isAdmin: boolean;
  mode: number;

  public ngOnInit() {
    this.isAdmin = false;
    this.mode = 0;

    this.question = {
      '_id': '5951b4b7800d4a3a760c1426',
      'updatedAt': '2017-06-27T01:28:23.810Z',
      'createdAt': '2017-06-27T01:28:23.810Z',
      'text': 'question 1 \n',
      'user': {
        '_id': '59277eae51afb44182bd71b3',
        'gravatarHash': 'aeac41c9efb18b94e94c44c4258d0fc4',
        'name': 'NONAME',
        'username': 'Stawrogin'
      },
      'likes': [],
      '__v': 0
    };
  }
}

describe('QuestionListEntryComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MomentModule,
        RouterTestingModule,
        LinkyModule,
        EmojiModule
      ],
      declarations: [
        QuestionListEntryComponent,
        AvatarDirective,
        MeditatedRecentlyDirective,
        TestHostComponent,
        FlagComponent,
      ],
      providers: [
        {provide: QuestionService, useClass: FakeQuestionService},
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('question-list-entry'));
  });

  it('should be created', () => {
    expect(el).toBeTruthy();
  });
});
