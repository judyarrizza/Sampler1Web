import {Component} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";

@Component({
  selector: 'app-check-renderer',
  templateUrl: './check-renderer.component.html',
  styleUrls: ['./check-renderer.component.scss']
})
export class CheckRendererComponent implements AgRendererComponent {
  private params: any;
  iconType = 'times';
  checked = false;

  agInit(params: any): void {
    this.params = params;
    this.checked = params.value;
    this.setDisplay();
  }

  setDisplay() {
    this.iconType = (this.checked === true) ? 'check' : 'times';
  }

  refresh(params: any): boolean {
    this.setDisplay();
    return true;
  }
}

