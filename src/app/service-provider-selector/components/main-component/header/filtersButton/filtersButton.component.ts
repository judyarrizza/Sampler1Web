import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'sps-filters-button',
  templateUrl: './filtersButton.component.html',
  styleUrls: ['./filtersButton.component.scss']
})
export class FiltersButtonComponent {
  @Output() toggleFilter: EventEmitter<boolean> = new EventEmitter();
  chevron = 'chevron-down';
  showFilters = false;

  toggleShowFilters() {
    this.showFilters = !this.showFilters;
    this.chevron = this.showFilters ? 'chevron-up' : 'chevron-down';
    this.toggleFilter.emit(this.showFilters);
  }
}
