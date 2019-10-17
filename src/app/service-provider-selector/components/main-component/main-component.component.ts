import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef
} from '@angular/core';

import { ApiService } from '../../services/api/api.service';
import { AuthService } from '@app/services/auth';
import { Provider } from "@app/service-provider-selector/services/api/models/provider.model";
import { MockService } from "@app/service-provider-selector/services/api/mock.service";
import {Crumb} from "@app/service-provider-selector/services/api/models/crumb.model";
import {Filters} from "@app/service-provider-selector/services/api/models/filters.model";

@Component({
  selector: 'sps-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [ ApiService, MockService ]
})

export class MainComponentComponent implements OnInit, OnDestroy, OnChanges {
  @Input() token = null;
  @Input() serviceProviderSelectorApiUrl: string | null = null;

  @Output() processPendingChanges = new EventEmitter();
  @Output() close = new EventEmitter();

  dataLoaded = false;
  providers: Array<Provider> = [];
  nameDisplay ='';
  addressDisplay ='';
  selectedIdx = -1;
  selectedId = '';
  lastSavedId = '';
  searchString = '';
  showFilter = false;
  filters = new Filters();
  crumbs: Array<Crumb> = [];
  allowNewProvider = false;
  providerChanged = false;

  private pendingChangesSubscription;

  constructor(
    public apiService: ApiService,
    public mockService: MockService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.pendingChangesSubscription = this.apiService.pendingChanges$.subscribe(() => {
      this.processPendingChanges.emit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.token && this.serviceProviderSelectorApiUrl ) {
      this.authService.apiToken = this.token;
      this.authService.apiPath = this.serviceProviderSelectorApiUrl;
      this.apiService.getCurrentData().subscribe(
        response => this.dataFetched(response),
        error => this.noDataFetched(error)
      );
    }
  }

  noDataFetched(error) {
    // console.log('ERROR on Data Fetch!');
    // console.log(error);
    const mockProviders = this.mockService.getMockProviders();
    this.dataFetched(mockProviders);
  }

  setSelectedIndex(providerId): number {
    this.selectedId = providerId;
    this.selectedIdx = this.providers.findIndex(rec => {
      return (rec.id === providerId);
    } );
    return this.selectedIdx;
  }

  setSelectedDisplay(selectedIdx) {
    if (selectedIdx > -1) {
      this.nameDisplay = this.providers[selectedIdx].name;
      this.addressDisplay = this.providers[selectedIdx].address + ', ' +
        this.providers[selectedIdx].city + ', ' +
        this.providers[selectedIdx].state + ' ' +
        this.providers[selectedIdx].zip;
    }
  }

  dataFetched(value) {
    console.log('Data Fetched');
    console.log(value);
    this.providers = [];
    if (value && value.providers) {
      value.providers.forEach(rec => {
        this.providers.push(new Provider(rec));
      });
    }
    this.lastSavedId = value.selected;
    this.setSelectedDisplay(this.setSelectedIndex(this.lastSavedId));
    this.setFilterTotals();
    this.setCrumbsFromFilters();
    this.dataLoaded = true;
    this.cdr.detectChanges();
  }

  setFilterTotals() {
    this.filters.totalApproved = 0;
    this.filters.totalAvailable = 0;
    this.filters.totalNotApproved = 0;
    this.filters.totalNotAvailable = 0;
    this.providers.forEach(rec => {
      if (rec.approved) {
        this.filters.totalApproved++;
      } else {
        this.filters.totalNotApproved++;
      }
      if (rec.fees) {
        this.filters.totalAvailable++;
      } else {
        this.filters.totalNotAvailable++;
      }
    });
  }

  setCrumbsFromFilters() {
    this.crumbs = [];

    // approved filter
    if (this.filters.approved !== this.filters.notApproved) {
      if (this.filters.approved) {
        this.crumbs.push(new Crumb(
          { column: 'approved',
                 value: true,
                 text:'Fees: approved'
                }));
      } else {
        this.crumbs.push(new Crumb(
          { column: 'approved',
            value: false,
            text:'Fees: not approved'
          }));
      }
    }
    // fees filter
    if (this.filters.available !== this.filters.notAvailable) {
      if (this.filters.available) {
        this.crumbs.push(new Crumb(
          { column: 'fees',
            value: true,
            text:'Fees: available'
          }));
      } else {
        this.crumbs.push(new Crumb(
          { column: 'fees',
            value: false,
            text:'Fees: not Available'
          }));
      }
    }

    // states filter
    if (this.filters.states === 'selected') {
        this.filters.statesList.forEach(stateRec =>  {
          if (stateRec.selected) {
            this.crumbs.push(new Crumb(
              { column: 'state',
                text: stateRec.state
              }));
          }
        });
    }
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

  removeCrumbFromFilters(crumb) {
    if (crumb.column === 'state') {
      this.filters.statesList.forEach(rec => {
        if (rec.state === crumb.text) {
          rec.selected = false;
        }
      });
      this.updateStateFilterType();
    } else if (crumb.column === 'fees') {
      if (crumb.value === false) {
        this.filters.available =  true;
      } else {
        this.filters.notAvailable = true;
      }
    } else if (crumb.column === 'approved') {
      if (crumb.value === false) {
        this.filters.approved =  true;
      } else {
        this.filters.notApproved = true;
      }
    }
    this.updateGridFromFilters();
  }

  updateGridFromFilters() {
    this.filters = Object.assign({}, this.filters);
  }

  onCancelFilter(crumb) {
    this.allowNewProvider = true;
    const idx = this.crumbs.findIndex(rec => rec === crumb);
    if (idx > -1) {
      this.removeCrumbFromFilters(crumb);
      this.crumbs.splice(idx, 1);
    }
  }

  onChangeFilters(filters) {
    this.allowNewProvider = true;
    this.setCrumbsFromFilters();
    this.updateGridFromFilters();
  }

  onChangeSearch(searchString) {
    this.allowNewProvider = true;
    this.searchString = searchString;
  }

  onChangeSelection(provider) {
    this.selectedId = provider.id;
    this.providerChanged = true;
    provider.selected =  true;
  }

  onToggleFilter(showFilter) {
    this.showFilter = showFilter;
  }

  ngOnDestroy(): void {
    if (this.pendingChangesSubscription) {
      this.pendingChangesSubscription.unsubscribe();
    }
  }

  onNewProvider(): void {
    console.log('ACTION FOR NEW PROVIDER');
  }

  onClose(): void {
    console.log('ACTION ON CLOSE (discard any changes and exit)');
    this.close.emit();
  }

  onUpdate(): void {
    console.log('ACTION ON UPDATE');
    this.lastSavedId = this.selectedId;
    this.setSelectedDisplay(this.setSelectedIndex(this.lastSavedId));
  }


}

