import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'fa-icon',
  templateUrl: './fa-icon.component.html',
  styleUrls: ['./fa-icon.component.scss']
})
export class FaIconComponent implements OnChanges {

  @Input() type = '';
  @Input() color = '';

  colorValue = '#000';

  constructor( private cdr: ChangeDetectorRef) { }

  ngOnChanges() {
    switch (this.color) {
      case 'red': this.colorValue = '#C60751'; break;
      case 'yellow': this.colorValue = '#976E21'; break;
      case 'black': this.colorValue = '#484f59'; break;
      case 'blue': this.colorValue = '#3a5e7a'; break;
      case 'warning': this.colorValue = '#ffba39'; break;
      case 'success': this.colorValue = '#7a9b14'; break;
      case 'disabled': this.colorValue = '#d0cac2'; break;
      case 'enabled': this.colorValue = '#5e9aca'; break;
      case 'primary': this.colorValue = '#5e9aca'; break;
      default:
    }

    this.cdr.detectChanges();
  }

}
