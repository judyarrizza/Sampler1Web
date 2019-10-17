import {Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation} from '@angular/core';
import {Provider} from "@app/service-provider-selector/services/api/models/provider.model";
import {RadioRendererComponent} from "@app/service-provider-selector/components/main-component/table/radio-renderer/radio-renderer.component";
import {FeesHeaderComponent} from "@app/service-provider-selector/components/main-component/table/fees-header/fees-header.component";
import {ApprovedHeaderComponent} from "@app/service-provider-selector/components/main-component/table/approved-header/approved-header.component";
import {CheckRendererComponent} from "@app/service-provider-selector/components/main-component/table/check-renderer/check-renderer.component";
import {Filters} from "@app/service-provider-selector/services/api/models/filters.model";

@Component({
  selector: 'sps-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnChanges {
  @Input() searchString = '';
  @Input() selectedId = '';
  @Input() filters!: Filters;
  @Input() providers: Array<Provider> = [];
  @Output() changeSelection = new EventEmitter();

  private gridApi;
  private gridColumnApi;

  lastPage;
  currentPage = 1;
  totalPages;

  startRec;
  endRec;
  totalRecs;
  leftChevronCursor = 'default-cursor';
  rightChevronCursor = 'default-cursor';

  rowData:Array<any> = [];

  cellStyle = { lineHeight: '50px' };
  paginationPageSize = 10;
  leftColor = "disabled";
  rightColor="disabled";
  
  leftPageNumbers: Array<number> = [];
  middlePageNumbers: Array<number> = [];
  rightPageNumbers: Array<number> = [];

  columnDefs = [
    {
      headerName: '',
      field: 'selected',
      width: 60,
      cellRendererFramework: RadioRendererComponent
    },{
      headerName: 'Name',
      field: 'name',
      width: 250,
      resizable: true,
      sortable: true,
      cellStyle: this.cellStyle
    },{
      headerName: 'Address',
      field: 'address',
      width: 320,
      resizable: true,
      sortable: true,
      cellStyle: this.cellStyle
    },{
      headerName: 'City',
      field: 'city',
      width: 140,
      resizable: true,
      sortable: true,
      cellStyle: this.cellStyle
    },{
      headerName: 'State',
      field: 'state',
      width: 85,
      sortable: true,
      cellStyle: this.cellStyle
    },{
      headerName: 'Zip',
      field: 'zip',
      width: 85,
      sortable: true,
      cellStyle: this.cellStyle
    },{
      headerName: 'Fees',
      field: 'fees',
      width: 90,
      headerComponentFramework: FeesHeaderComponent,
      cellRendererFramework: CheckRendererComponent
    },{
      headerName: 'Approved',
      field: 'approved',
      width: 124,
      headerComponentFramework: ApprovedHeaderComponent,
      cellRendererFramework: CheckRendererComponent
    }
  ];

  constructor() {
  }

  ngOnChanges() {
    this.providers.forEach(rec => {
      rec.selected = (rec.id === this.selectedId) ;
    });

    this.rowData = this.getFilteredProviders();
    this.totalPages = this.rowData.length / this.paginationPageSize;
  }

  isRecWanted(provider: Provider): boolean {
    if (this.filters.states === 'none') {
      return false;
    } else if (this.filters.states === 'selected') {
      const s = this.filters.statesList.find(rec => rec.state === provider.state );
      if (s && !s.selected) {
        return false;
      }
    }
    if (!this.filters.approved && !this.filters.notApproved) {
      return false;
    } else if (this.filters.approved !== this.filters.notApproved &&
      this.filters.approved !== provider.approved) {
      return false;
    }
    if (!this.filters.available && !this.filters.notAvailable) {
      return false;
    } else if (this.filters.available !== this.filters.notAvailable &&
      this.filters.available !== provider.fees) {
      return false;
    }
    return true;
  }

  getFilteredProviders(): Array<Provider> {
    const filteredData: Array<Provider> = [];
    this.providers.forEach(rec => {
      if (this.isRecWanted(rec)) {
          filteredData.push(rec);
        }
      });
    return filteredData;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setRecRange();
  }

  onPaginationChanged(event) {
    if (this.gridApi) {
      this.lastPage = this.gridApi.paginationIsLastPageFound();
      this.paginationPageSize = this.gridApi.paginationGetPageSize();
      this.currentPage = this.gridApi.paginationGetCurrentPage() + 1;
      this.totalPages = this.gridApi.paginationGetTotalPages();
      this.setRecRange();
    }
  }

  setRecRange() {
    this.totalRecs = this.rowData.length;
    this.startRec = ((this.currentPage - 1) * this.paginationPageSize) + 1;
    this.endRec = this.startRec + this.paginationPageSize - 1;
    if (this.endRec > this.totalRecs) this.endRec = this.totalRecs;
    this.setCurrentOptions();
  }

  setCurrentOptions() {
    this.leftPageNumbers = [1];
    this.middlePageNumbers = [];
    this.rightPageNumbers = [];

    // behavior if under 6 pages total
    if (this.totalPages <= 5) {
      for (let i = 2; i <= this.totalPages; i++) {
        this.leftPageNumbers.push(i);
      }
    } else { // behavior if more than 6 pages
      if (this.currentPage < 4) {
          this.leftPageNumbers = [1,2,3,4];
          this.rightPageNumbers = [this.totalPages];
      } else if (this.currentPage > this.totalPages - 3) {
          this.rightPageNumbers = [this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages];
      } else {
          this.middlePageNumbers = [this.currentPage - 1, this.currentPage, this.currentPage + 1];
          this.rightPageNumbers = [this.totalPages];
      }
    }

    this.setChevrons();
  }

  setChevrons() {
    if (this.currentPage > 1) {
      this.leftColor = "enabled";
      this.leftChevronCursor = "pointer-cursor";
    } else {
      this.leftColor = "disabled";
      this.leftChevronCursor = "default-cursor";
    }
    if (this.currentPage < this.totalPages) {
      this.rightColor = "enabled";
      this.rightChevronCursor = "pointer-cursor";
    } else {
      this.rightColor = "disabled";
      this.rightChevronCursor = "default-cursor";
    }
  }

  onPageSizeChanged(value) {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(value));
    }
  }

  onGoToNext() {
    this.gridApi.paginationGoToNextPage();
    this.currentPage = this.gridApi.paginationGetCurrentPage() + 1;
  }

  onGoToPrevious() {
    this.gridApi.paginationGoToPreviousPage();
    this.currentPage = this.gridApi.paginationGetCurrentPage() + 1;
  }

  onGoToPage(pageNum) {
    this.gridApi.paginationGoToPage(pageNum);
    this.currentPage = this.gridApi.paginationGetCurrentPage() + 1;
  }


  onCellClicked(event) {
    if (event.colDef.field === 'selected') {
      console.log('SELECTED FIELD WAS CLICKED');
      console.log(event);
      event.node.data.selected = !event.node.data.selected;
      this.gridApi.refreshCells();
      this.changeSelection.emit(event.node.data);
    }
  }

}
