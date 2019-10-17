import { Component, Input, EventEmitter, Output, ViewEncapsulation, OnDestroy, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';

import { ApiService } from '@app/service-provider-selector/services/api';
import { EnvironmentService } from '@app/services/environment/environment.service';
import { environment as staticEnvironment } from '@src/environments/environment';
import { EventService } from '@app/services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '@app/services/auth';
import { AuthenticationService } from '@app/services/authentication/authentication.service';
import { MockService } from "@app/service-provider-selector/services/api/mock.service";

@Component({
  selector: 'fv-shell',
  templateUrl: './shell.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [AuthService, ApiService, MockService]
})
export class ShellComponent implements OnInit, OnDestroy {
  ready = false;
  readOnly = false;
  ssoToken: any = null;
  apiToken: any = null;
  eventsPath: any = null;

  username = 'posbanker';
  password = 'Think550$9*';

  // NOTE: URLS for API and EVENT are set in app/assets/environment.json

  /* MOCK TEST */
  // loginPath = 'http://localhost:3001';
  apiPath = 'http://localhost:3001';
  loanId = 'MOCK_LOAN_ID';
  /*****/

  /* DEV TEST *
  loginPath = 'https://pos-api-dv1.loandepotdev.works';
  apiPath = 'https://ServiceProviderSelectorAPI-DV1.loandepotdev.works';
  // loanId = '1_MTG_404eac9f-4440-e911-80f1-0050568f6f99'; // simple sample
  // loanId = '1_MTG_404eac9f-4440-e911-80f1-0050568f6f99'; // One Borrower Emp Verification not Run
  loanId = '1_MTG_B6A3F576-C242-45D6-AAF5-663F011AAF75'; // Two Borrowers with asset Verification
  // loanId = '1_MTG_dc7f1980-e933-e911-80ef-0050568f6f99'; // many verified assets
  // loanId = '1_MTG_3e12908c-5047-e911-80fb-005056a43a7a'; // for testing asset updates
  /*****/

  /* QA TEST *
  // loginPath = 'https://pos-api-qa1.loandepotdev.works';
  apiPath = 'https://ServiceProviderSelectorAPI-QA1.loandepotdev.works';
  // loanId = '1_MTG_9115677C-FEB1-46F5-BEC1-E8825DE42FC6'; // QA Example 1
  // loanId = '1_MTG_646c920b-2456-e911-80f1-0050568f9a4b';
  // loanId = '1_MTG_9115677C-FEB1-46F5-BEC1-E8825DE42FC6';    // QA Example 2
  loanId = '1_MTG_4072C953-B557-E911-80F1-0050568F9A4B';
  //  loanId = '1_MTG_66d8ba87-4261-e911-80f1-0050568f9a4b'; // 2 email missing check case
  /*****/

  /* STAGE TEST *
 //  loginPath = 'https://pos-api-sg1.loandepotdev.works';
  apiPath = 'https://ServiceProviderSelectorAPI-SG1.loandepotdev.works';
//  loanId = '1_MTG_62476FF1-A4ED-E811-80FD-0050568F8E00'; // SG1 Email
  loanId = '1_MTG_c7818c48-8f60-e911-8106-0050568f8e00'; // 2 email case
  /*****/

  /* LOCAL SERVER *
  // loginPath = 'https://localhost:5005';
  apiPath = 'https://localhost:5005';
  //loanId = 'LOCAL_1_BORROWER'; // LOCAL SERVER 1
  /*****/

  ssoTokenSub: Subscription | null = null;
  closeSub: Subscription | null = null;

  constructor(
    public authService: AuthService,
    public authenticationService: AuthenticationService,
    public mockService: MockService,
    private cdr: ChangeDetectorRef,
    private environmentService: EnvironmentService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.environmentService.initialize();

    if (staticEnvironment.production) {
      await this.getDataFromCommandLine();
    } else {
      this.getDataFromLogin();
    }
  }

  async getDataFromCommandLine() {
    this.loanId = this.route.snapshot.queryParamMap.get('loanId') || '';
    console.log('ServiceProviderSelectorWeb.ShellComponent.ngOnInit loanId', this.loanId);
    if (!this.loanId) {
      console.error('ServiceProviderSelectorWeb.ShellComponent.ngOnInit loan-id is falsy');
      return;
    }

    this.readOnly = this.route.snapshot.queryParamMap.get('readOnly') === 'true';
    console.log('ServiceProviderSelectorWeb.ShellComponent.ngOnInit readOnly', this.readOnly);

    this.ssoToken = this.route.snapshot.queryParamMap.get('ssoToken') || '';
    console.log('ServiceProviderSelectorWeb.ShellComponent.ngOnInit ssoToken', this.ssoToken);
    if (!this.ssoToken) {
      console.error('ServiceProviderSelectorWeb.ShellComponent.ngOnInit ssoToken is falsy');
      return;
    }

    this.authService.ssoToken = this.ssoToken;
    this.apiToken = await this.authenticationService.generateToken(this.ssoToken);

    if (!this.apiToken) {
      console.error('ServiceProviderSelectorWeb.ShellComponent.ngOnInit appToken is falsy');
      return;
    }

    this.closeSub = this.eventService.closeRequested$.pipe(filter(value => value)).subscribe(
      () => {
        console.log('---> navigating away');
        this.router.navigate(['/close']);
      }
    );

    await this.eventService.start(this.loanId, this.apiToken);

    this.apiPath = this.environmentService.environment.serviceProviderSelectorApiUrl;
    this.eventsPath = this.environmentService.environment.serviceProviderSelectorEventsUrl;

  }


  getDataFromLogin() {
    console.log('get data from login');
   // this.apiPath = this.environmentService.environment.serviceProviderSelectorApiUrl;
    this.authService.generateApiTokenFromCredentials(this.username, this.password, this.apiPath).subscribe(
      response => this.onAuthenticated(response),
      error => this.onNotAuthenticated(error)
    );
  }

  onNotAuthenticated(error) {
//    console.error('ServiceProviderSelectorWeb.ShellComponent.onNotAuthenticated apiToken not received');
//    this.authService.onTokenGenerationFailure(error);
//    this.cdr.detectChanges();
    console.log('Using MOCK API Token');
    const response = this.mockService.getMockApiToken();
    this.onAuthenticated(response).then();
  }

  async onAuthenticated(response) {
    console.log('ServiceProviderSelectorWeb.ShellComponent.onAuthenticated apiToken received');
    console.log(response.body.Token);
    this.authService.apiToken = response.body.Token;
    this.apiToken = response.body.Token;
    this.ready = true;
    this.cdr.detectChanges();
  }

  onProcessPendingChanges() {
    console.log('ProcessPendingChanges Called');
    if (this.eventsPath) {
      this.eventService.processPendingChanges();
    }
  }

  onClose() {
    console.log('Close Called');
    if (this.eventsPath) {
      this.eventService.close();
    }
    console.log('---> navigating away');
    this.router.navigate(['/close']);
  }

  ngOnDestroy() {
    if (this.ssoTokenSub) {
      this.ssoTokenSub.unsubscribe();
    }
  }
}
