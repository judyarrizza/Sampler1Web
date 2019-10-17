import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Crumb } from "@app/service-provider-selector/services/api/models/crumb.model";

@Component({
  selector: 'app-crumb',
  templateUrl: './crumb.component.html',
  styleUrls: ['./crumb.component.scss']
})
export class CrumbComponent implements OnChanges {
  @Input() crumb!: Crumb;
  @Output() cancelFilter: EventEmitter<Crumb> = new EventEmitter();

  constructor() { }

  ngOnChanges() {
  }

  onCancel() {
    this.cancelFilter.emit(this.crumb);
  }

}
