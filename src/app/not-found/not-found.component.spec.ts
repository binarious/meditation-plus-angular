import {
  inject,
  async,
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { AppState } from '../app.service';
import { AppModule } from '../';

describe('not-found component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents();
  }));

  it('should init', async(() => {
    const fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(
      compiled.querySelector('md-card-title').innerHTML
    ).toContain('Page has not been found');
  }));
});
