/** This Service encapsulates login, authentication, and REST decoration **/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private _username: string | null | undefined = null;
  private _password: string | null | undefined = null;

  private _loginPath: string | null | undefined = null;
  private _apiPath: string | null | undefined = null;

  private _idToken: string | null | undefined = null;
  private _ssoToken: string | null | undefined = null;
  private _apiToken: string | null | undefined = null;

  private _error: any = null;
  private _authenticated = false;

  private authStateSource = new BehaviorSubject<string>('NoUser');
  authState$ = this.authStateSource.asObservable();

  private ssoTokenSource = new BehaviorSubject<string>('');
  ssoToken$ = this.ssoTokenSource.asObservable();

  constructor(private http: HttpClient) { }

  // API: https://finiancialverificationAPI-XXX.loanf=depotdev.works
  set apiPath(path) {
    this._apiPath = path;
  }

  get apiPath() {
    return this._apiPath;
  }

  get authError() {
    return this._error;
  }

  set authError( val: any ) {
    this._error = val;
  }

  get authenticated() {
    return this._authenticated;
  }

  get ssoToken() {
    return this._ssoToken;
  }

  set ssoToken(token) {
    this._ssoToken = token;
  }

  set authenticated( val: boolean ) {
    this._authenticated = val;
  }

  set apiToken(token) {
    this._apiToken = token;
    if (token && token.length > 0) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  get apiToken() {
    return this._apiToken;
  }

  // single call to set credentials and authenticate user
  login(username, password, loginPath, apiPath) {
    this._username =  username;
    this._password = password;
    this._loginPath = loginPath;
    this._apiPath = apiPath;

    if (!this._loginPath || !this._apiPath) {
      this.authStateSource.next('InvalidLoginURL');
      this.authError = { error: 'badUrl' };
      return;
    }

    if (!username || !password) {
      this.authStateSource.next('InvalidCredentials');
      this.authError = { error: 'badCred' };
      return;
    }

    this._idToken = null;
    this._ssoToken = null;
    this.authError = null;
    this.loginFromCredentials()
        .subscribe(
            (response) => this.authenticateUser(response.data.token),
            (error) => this.onLoginFailure(error)
        );
  }

  loginFromCredentials(): Observable<any> {
    return this.http.post(
        this._loginPath + '/api/v1/authentication/login',
        {
          username: this._username,
          password: this._password
        });
  }

  onLoginFailure(error) {
    this.authStateSource.next('LoginFailed');
    this.authError = error;
  }

  getValidSSOToken(): Observable<any> {
    return this.http.post(
      this._loginPath + '/api/v1/authentication/sso',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + this._idToken
        }
      });
  }

  authenticateUser(idToken) {
    this._idToken = idToken;
    this.getValidSSOToken()
        .subscribe(
            (response) => this.onSSOTokenReceived(response.data.token),
            (error) => this.onSSORequestFailed(error)
        );
  }

  onSSORequestFailed(error) {
    console.log('ServiceProviderSelectorComponent.authenticateUser SSO request failed');
    this._ssoToken = null;
    this._apiToken = null;
    this.authStateSource.next('AuthenticationFailure');
    this.authError = error;
  }

  onSSOTokenReceived(ssoToken) {
    this._ssoToken = ssoToken;
    console.log('ServiceProviderSelectorComponent.authenticateUser SSO to api succeeded');
 //   console.log(this._ssoToken);
    this.ssoTokenSource.next(ssoToken);
  }


////////////////

  generateApiTokenFromCredentials(username, password, apiPath): Observable<any> {
    this._apiPath = apiPath;
    this._username = username;
    this._password = password;

    const path = this._apiPath + '/api/v1/auth/login';
    console.log('GenerateApiTokenFromCredentials');
    console.log('path  = ' + path);
    console.log('username  = ' + username);
    console.log('password  = ' + password);

    return this.http.post<{Token: string}>(
      path,
      {
        username: this._username,
        password: this._password
      },
      { observe: 'response' }
    );
  }

  ///////// THIS IS CALLED FROM THE COMPONENT USING THE SSO-TOKEN PASSED IN

  generateApiToken(): Observable<any> {
    return this.http.post(
      this._apiPath + '/api/v1/auth/sso',
      {
        ssoToken: this._ssoToken
      },
      { responseType: 'json' }
    );
  }

  onApiTokenGenerated(apiToken) {
    this.apiToken = apiToken;
    this.authStateSource.next('Authenticated');
    this.authenticated =  true;
  }

  onTokenGenerationFailure(error) {
    console.log('Authentication failed');
    this.apiToken = null;
    this.authStateSource.next('AuthenticationFailure');
    this.authError = error;
  }

  //// THESE ARE HTTP PATH/AUTHENTICATOR HANDLERS

  optionsBuilder(ops): any {
    const options = ops || {};
    const authOptions = { ...options,
      headers: {
        Authorization: 'Bearer ' + this._apiToken
      }
    };
    return authOptions;
  }

  authPost(url, body?, ops?): Observable<any> {
    const fullURL = this._apiPath + url;
    const payload = body || {};
    return this.http.post<any> (
        fullURL,
        payload,
        this.optionsBuilder(ops)
    );
  }

  authGet(url, ops?): Observable<any> {
    const fullURL = this._apiPath + url;
    const options = this.optionsBuilder(ops);
    return this.http.get<any> (
        fullURL,
        options
    );
  }

  authPut(url, body?, ops?): Observable<any> {
    const fullURL = this._apiPath + url;
    const payload = body || {};
    return this.http.put<any> (
        fullURL,
        payload,
        this.optionsBuilder(ops)
    );
  }

  authDelete(url, ops?): Observable<any> {
    const fullURL = this._apiPath + url;
    return this.http.delete<any> (
        fullURL,
        this.optionsBuilder(ops)
    );
  }

}
