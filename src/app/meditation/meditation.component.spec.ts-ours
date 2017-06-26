import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FakeMeditationService } from './testing/fake-meditation.service';
import { MeditationService } from './meditation.service';
import { UserService } from '../user/user.service';
import { FakeUserService } from '../user/testing/fake-user.service';
import { CommitmentService } from '../commitment/commitment.service';
import { FakeCommitmentService } from '../commitment/testing/fake-commitment.service';
import { FormsModule } from '@angular/forms';
import { MockComponent } from '../../testing/mock-component';
import { AvatarDirective } from '../profile/avatar.directive';
import { AppState } from '../app.service';
import { MeditationComponent } from './meditation.component';
import { addMatchers } from '../../testing/jasmine-matchers';
import { TestHelper } from '../../testing/test.helper';

describe('MeditationComponent', () => {
  let component: MeditationComponent;
  let fixture: ComponentFixture<MeditationComponent>;

  beforeEach(async(() => {
    addMatchers();
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        MeditationComponent,
        AvatarDirective,
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

  it('should have disabled submit button', () => {
    // clear field that could have been read from localstorage from other tests
    component.walking = null;
    component.sitting = null;

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('button[type="submit"]').disabled
    ).toBe(true);
  });

  it('should have 20 minute commitment', () => {
    const compiled = fixture.debugElement.nativeElement;
    const commitment = compiled.querySelector('.commitment');
    expect(commitment).toHaveText('20 minutes daily');
  });

  it('should send meditation time to service', () => {
    const compiled = fixture.debugElement.nativeElement;
    const mockService =
      fixture.debugElement.injector.get<any>(MeditationService) as FakeMeditationService;
    const spy = spyOn(mockService, 'post').and.callThrough();

    component.walking = '10';
    component.sitting = '20';

    // simulate submit
    const form = compiled.querySelector('form');
    TestHelper.dispatchEvent(form, 'submit');

    // the service function is called with currentMessage
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.argsFor(0)).toEqual([10, 20]);

  });
});
