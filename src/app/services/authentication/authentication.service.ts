import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { EnvironmentService } from '../environment/environment.service';

interface TokenResponse {
  Token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token$ = new BehaviorSubject<string | null>(null);

  constructor(private environmentService: EnvironmentService, private http: HttpClient) {}

  async generateToken(ssoToken: string) {
    console.log('ServiceProviderSelectorComponent.AuthenticationService.generateToken ssoToken', ssoToken);

    const environment = this.environmentService.environment;

    console.log('environment: ' + environment);

    const appToken = await this.http
      .post<TokenResponse>(
        `${environment.serviceProviderSelectorApiUrl}/api/v1/auth/sso`,
        {
          ssoToken: ssoToken
        },
        { observe: 'response', responseType: 'json' }
      )
      .pipe(
        catchError(error => {
          console.error('ServiceProviderSelectorComponent.AuthenticationService.generateToken_error', error);

          return of('');
        }),
        map(response => {
          if (response instanceof HttpResponse && response.ok && response.body && response.body.Token) {
            return response.body.Token;
          } else {
            return null;
          }
        })
      )
      .toPromise();

    this.token$.next(appToken);

    return appToken;
  }
}
