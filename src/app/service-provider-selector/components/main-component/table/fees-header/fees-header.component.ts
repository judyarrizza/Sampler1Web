import {Component, ElementRef, OnDestroy} from "@angular/core";
import {IHeaderParams} from "ag-grid-community";
import {IHeaderAngularComp} from "ag-grid-angular";

interface FeeParams extends IHeaderParams {
  menuIcon: string;
}

@Component({
  selector: 'app-fees-header',
  templateUrl: './fees-header.component.html',
  styleUrls: ['./fees-header.component.scss']
})
export class FeesHeaderComponent implements OnDestroy, IHeaderAngularComp {
  private elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  agInit(params: FeeParams): void {
  //  console.log('Fee Params');
  //  console.log(params);
  }

  ngOnDestroy() {
  //  console.log(`Destroying HeaderComponent`);
  }
}
