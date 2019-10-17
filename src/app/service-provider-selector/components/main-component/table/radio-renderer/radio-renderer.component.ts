import {Component} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";

@Component({
  selector: 'sps-radio-renderer',
  templateUrl: './radio-renderer.component.html',
  styleUrls: ['./radio-renderer.component.scss']
})
export class RadioRendererComponent implements AgRendererComponent {
  private params: any;
  iconType = 'circle-empty';
  checked = false;

  agInit(params: any): void {
    this.params = params;
    this.checked = params.value;
    this.setDisplay();
  }

  onToggle() {
    this.checked = !this.checked;
  }

  setDisplay() {
    this.iconType = (this.checked === true) ? 'circle-filled' : 'circle-empty';
  }

  refresh(params: any): boolean {
    this.setDisplay();
    return true;
  }
}
