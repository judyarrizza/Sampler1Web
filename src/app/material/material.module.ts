import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatTabsModule,
  MatRadioModule
} from '@angular/material';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatIconModule,
  MatTabsModule,
  MatRadioModule
];

@NgModule({
  imports: [MATERIAL_MODULES, HttpClientModule],
  exports: [MATERIAL_MODULES],
  providers: [MatIconRegistry]
})
export class MaterialModule {}
