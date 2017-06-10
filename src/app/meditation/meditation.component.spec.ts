import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FakeMeditationService} from './testing/fake-meditation.service';
import {MeditationService} from './meditation.service';
import {UserService} from '../user/user.service';
import {FakeUserService} from '../user/testing/fake-user.service';
import {CommitmentService} from '../commitment/commitment.service';
import {FakeCommitmentService} from '../commitment/testing/fake-commitment.service';
import {FormsModule} from '@angular/forms';
import {MockComponent} from '../../testing/mock-component';
import {AvatarDirective} from '../profile/avatar.directive';
import {AppState} from '../app.service'
import {MeditationComponent} from './meditation.component';
import {addMatchers} from '../../testing/jasmine-matchers'
describe('MeditationComponent', () => {
  let component: MeditationComponent;
  let fixture: ComponentFixture<MeditationComponent>;

  beforeEach(async(() => {
    addMatchers()
    TestBed.configureTestingModule({

      imports: [MaterialModule,
        FormsModule,
        NoopAnimationsModule,

        RouterTestingModule
      ],

      declarations: [MeditationComponent, AvatarDirective,
        MockComponent({selector: 'meditation-chart'}),
        MockComponent({selector: 'meditation-list-entry', inputs: ['meditation']}),
      ],
      providers: [
        AppState,
        {provide: MeditationService, useClass: FakeMeditationService},
        {provide: CommitmentService, useClass: FakeCommitmentService},
        {provide: UserService, useClass: FakeUserService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.debugElement.nativeElement;



  });

  it('should have disabled submit button',()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('button[type="submit"]').disabled
    ).toBe(true);

  })
  it('should have 20 minute commitment',()=>{
    const compiled = fixture.debugElement.nativeElement;
    let commitment =compiled.querySelector('.commitment')
    debugger
    expect(commitment).toHaveText('20 minutes daily')

  })
});
