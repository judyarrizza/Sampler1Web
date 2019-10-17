import {Component, ElementRef, OnDestroy} from "@angular/core";
import {IHeaderParams} from "ag-grid-community";
import {IHeaderAngularComp} from "ag-grid-angular";

interface FeeParams extends IHeaderParams {
  menuIcon: string;
}

@Component({
  selector: 'app-approved-header',
  templateUrl: './approved-header.component.html',
  styleUrls: ['./approved-header.component.scss']
})
export class ApprovedHeaderComponent implements OnDestroy, IHeaderAngularComp {
  private elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  agInit(params: FeeParams): void {
 //   console.log('Approved Header Params');
 //   console.log(params);
  }

  ngOnDestroy() {
 //   console.log(`Destroying HeaderComponent`);
  }
}
