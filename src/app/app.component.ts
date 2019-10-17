import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  versionState = 'hideVersion';
  onToggleVersionState() {
    this.versionState = (this.versionState === 'showVersion') ? 'hideVersion' : 'showVersion';
  }
}
