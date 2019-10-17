import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'sps-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnChanges {
  @Input() searchString = "";
  @Output() change: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnChanges() {
  }

  onChange(newStr) {
    this.change.emit(newStr);
  }

}
