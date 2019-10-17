import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {Crumb} from "@app/service-provider-selector/services/api/models/crumb.model";

@Component({
  selector: 'sps-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  @Input() spType = 'Settlement';
  @Input() nameDisplay = '';
  @Input() addressDisplay = '';
  @Input() crumbs: Array<Crumb> = [];
  @Output() changeSearch: EventEmitter<string> = new EventEmitter();
  @Output() cancelFilter: EventEmitter<Crumb> = new EventEmitter();
  @Output() toggleFilter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnChanges( ) {}

  onCancelFilter(Crumb) {
    this.cancelFilter.emit(Crumb);
  }

  onSearchStringChanged(searchString) {
    if (!searchString.type) {
      this.changeSearch.emit(searchString);
    }
  }

  onToggleFilter(showFilter) {
    this.toggleFilter.emit(showFilter);
  }

}
