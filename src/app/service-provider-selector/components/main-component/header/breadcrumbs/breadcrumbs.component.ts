import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Crumb} from "@app/service-provider-selector/services/api/models/crumb.model";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() crumbs: Array<Crumb> = [];
  @Output() cancelFilter: EventEmitter<Crumb> = new EventEmitter();

  constructor() { }

  onCancel(crumb) {
    this.cancelFilter.emit(crumb);
  }

}
