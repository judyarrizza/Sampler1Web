import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filters} from "@app/service-provider-selector/services/api/models/filters.model";

@Component({
  selector: 'sps-filters-input',
  templateUrl: './filters-input.component.html',
  styleUrls: ['./filters-input.component.scss']
})
export class FiltersInputComponent implements OnInit {
  @Input() filters!: Filters;
  @Output() changeFilters: EventEmitter<Filters> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onStatesChange() {
    console.log('States changed to: ' + this.filters.states);
     if (this.filters.states === 'all') {
       this.filters.statesList.forEach(rec => rec.selected = true);
     } else if (this.filters.states === 'none') {
      this.filters.statesList.forEach(rec => rec.selected = false);
    }
    this.changeFilters.emit(this.filters);
  }

  updateStateFilterType() {
    let allSelected = true;
    let allUnselected = true;
    this.filters.statesList.forEach(rec => {
      if (rec.selected) {
        allUnselected = false;
      } else if (!rec.selected) {
        allSelected = false;
      }
    });
    if (allSelected) {
      this.filters.states = 'all';
    } else if (allUnselected) {
      this.filters.states = 'none';
    } else {
      this.filters.states = 'selected';
    }
  }

  onStateChange(stateRec) {
    this.updateStateFilterType();
    this.changeFilters.emit(this.filters);
  }

  onApprovedChange() {
    this.changeFilters.emit(this.filters);
  }
  onNotApprovedChange() {
    this.changeFilters.emit(this.filters);
  }
  onAvailableChange() {
    this.changeFilters.emit(this.filters);
  }
  onNotAvailableChange() {
    this.changeFilters.emit(this.filters);
  }



}
