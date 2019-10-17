import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { environment as staticEnvironment } from '@src/environments/environment';
import { Environment, TrackingServiceConfiguration } from './environment';
import { DynamicEnvironment } from './dynamic-environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private _environment: Environment = new Environment('', '', new TrackingServiceConfiguration(false, ''));

  private environmentSubject = new BehaviorSubject<Environment>(this._environment);

  environment$ = this.environmentSubject.asObservable();

  set environment(environment: Environment) {
    console.log('calling set');

    this._environment = environment;

    this.environmentSubject.next(this._environment);
  }

  get environment(): Environment {
    return this._environment;
  }

  constructor(private http: HttpClient) {
    console.log('ServiceProviderSelectorWeb.EnvironmentService.constructor');
  }

  async initialize() {
    const dynamicEnvironmentPath = staticEnvironment.local ? 'assets/environment.local.json' : 'assets/environment.json';

    const dynamicEnvironment = await this.http.get<DynamicEnvironment>(dynamicEnvironmentPath).toPromise();
    console.log('ServiceProviderSelectorWeb.EnvironmentService.initialize dynamicEnvironment', dynamicEnvironment);

    this.environment = new Environment(
      dynamicEnvironment.serviceProviderSelectorApiUrl,
      dynamicEnvironment.serviceProviderSelectorEventsUrl,
      new TrackingServiceConfiguration(staticEnvironment.tracking.enabled, staticEnvironment.tracking.mixPanelToken)
    );
  }
}
