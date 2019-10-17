import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/material';
import { DndModule } from '@beyerleinf/ngx-dnd';

import {
  MainComponentComponent,
  ShellComponent
} from './components';

import { FaIconComponent } from "@app/service-provider-selector/components/main-component/shared/fa-icon/fa-icon.component";
import { LoadingComponent } from "@app/service-provider-selector/components/main-component/shared/loading/loading.component";
import { HeaderComponent } from './components/main-component/header/header.component';
import { FooterComponent } from './components/main-component/footer/footer.component';
import { TableComponent } from './components/main-component/table/table.component';
import { AgGridModule } from 'ag-grid-angular';
import { SearchboxComponent } from './components/main-component/header/searchbox/searchbox.component';
import { RadioRendererComponent } from "@app/service-provider-selector/components/main-component/table/radio-renderer/radio-renderer.component";
import { CheckRendererComponent } from './components/main-component/table/check-renderer/check-renderer.component';
import { FeesHeaderComponent } from './components/main-component/table/fees-header/fees-header.component';
import { ApprovedHeaderComponent } from './components/main-component/table/approved-header/approved-header.component';
import { BreadcrumbsComponent } from './components/main-component/header/breadcrumbs/breadcrumbs.component';
import { CrumbComponent } from './components/main-component/header/breadcrumbs/crumb/crumb.component';
import { FiltersButtonComponent } from "@app/service-provider-selector/components/main-component/header/filtersButton/filtersButton.component";
import { FiltersInputComponent } from './components/main-component/filters-input/filters-input.component';
import { FiltersComponent } from "@app/service-provider-selector/components/main-component/header/filters/filters.component";
import { MatCheckboxModule } from "@angular/material";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    DndModule,
    AgGridModule.withComponents(),
    MatCheckboxModule,
  ],
  declarations: [
    ShellComponent,
    MainComponentComponent,
    FaIconComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent,
    FiltersComponent,
    FiltersButtonComponent,
    RadioRendererComponent,
    SearchboxComponent,
    CheckRendererComponent,
    FeesHeaderComponent,
    ApprovedHeaderComponent,
    BreadcrumbsComponent,
    CrumbComponent,
    FiltersInputComponent
  ],
  providers: [
    // TrackingService
  ],
  entryComponents: [
    RadioRendererComponent,
    CheckRendererComponent,
    FeesHeaderComponent,
    ApprovedHeaderComponent
  ],
  exports: [ShellComponent]
})

export class ServiceProviderSelectorModule { }
