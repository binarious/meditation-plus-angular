import {
  Component,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import { QuestionService } from '../question.service';


@Component({
  selector: 'question-suggestions',
  template: require('./suggestions.component.html'),
  styles: [
    require('./suggestions.component.css')
  ]
})
export class QuestionSuggestionsComponent {
  @Input() currentQuestion: string;

  suggestions: Object[];
  activated: boolean = true;
  loading: boolean = false;
  timeout: boolean = false;
  missedChange: boolean = false;

  constructor(
    public questionService: QuestionService,
  ) {
  }

  ngOnChanges() {
    if (!this.timeout) {
      this.loadSuggestions();
    } else {
      this.missedChange = true;
    }
  }

  doTimeout() {
    setTimeout(() => {
      this.timeout = false;
      if (this.missedChange) {
        this.missedChange = false;
        this.loadSuggestions();
      }
    }, 2000);
  }

  loadSuggestions() {
    if (!this.activated || this.timeout || this.currentQuestion.length < 10) {
      return;
    }

    this.loading = true;
    this.timeout = true;
    this.questionService.findSuggestions(this.currentQuestion)
      .subscribe((data) => {
        this.loading = false;
        this.suggestions = data.json();
        this.doTimeout();
      }, (err) => {
        console.error(err);
      });
  }
}
