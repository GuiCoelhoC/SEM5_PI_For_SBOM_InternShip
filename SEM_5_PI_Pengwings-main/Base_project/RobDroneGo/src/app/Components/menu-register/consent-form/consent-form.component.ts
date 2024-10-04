import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-consent-form',
  templateUrl: './consent-form.component.html',
  styleUrls: ['./consent-form.component.css']
})
export class ConsentFormComponent {

  @Output() consentChange = new EventEmitter<boolean>();

  Accept() {
    this.consentChange.emit(true);
  }

  Decline() {
    this.consentChange.emit(false);
  }
}
