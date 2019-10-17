import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@app/material';
import { GetTokenComponent } from '@app/get-token/get-token.component';
import { AuthService } from '@app/services/auth';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  declarations: [
    GetTokenComponent
  ],
  providers: [
    AuthService
  ],
})
export class GetTokenModule { }
