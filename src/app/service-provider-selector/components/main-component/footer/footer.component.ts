import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'sps-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() allowNewProvider = false;
  @Input() providerChanged = false;
  @Output() newProvider = new EventEmitter();
  @Output() closePage = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor() { }

  onNewProvider() {
    this.newProvider.emit();
  }

  onClose() {
    this.closePage.emit();
  }

  onUpdate() {
    this.update.emit();
  }

}
