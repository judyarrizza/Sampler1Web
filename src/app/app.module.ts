import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule} from '@angular/platform-browser';
import { GetTokenModule } from '@app/get-token/get-token.module';

import { environment as staticEnvironment } from '@src/environments/environment';
import { AppComponent } from './app.component';

import { EventService } from './services/event/event.service';
import { MockEventService } from './services/event/mock-event.service';
import { NotFoundComponent, CloseComponent, PingComponent } from './components';
import { ShellComponent } from '@app/service-provider-selector/components';
import { ServiceProviderSelectorModule } from "@app/service-provider-selector";


const PROVIDE_EVENT_SERVICE = staticEnvironment.production ? EventService : { provide: EventService, useClass: MockEventService };

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    GetTokenModule,
    ServiceProviderSelectorModule,
    RouterModule.forRoot([
      { path: '404', component: NotFoundComponent },
      { path: 'close', component: CloseComponent },
      { path: 'diagnostics/ping', component: PingComponent },
      { path: '', component: ShellComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '404' }
    ])
  ],
  declarations: [AppComponent, CloseComponent, PingComponent, NotFoundComponent],
  providers: [PROVIDE_EVENT_SERVICE],
  bootstrap: [AppComponent]
})

export class AppModule {}
