export class Environment {
  constructor(public serviceProviderSelectorApiUrl: string,
              public serviceProviderSelectorEventsUrl: string,
              public tracking: TrackingServiceConfiguration) {}
}

export class TrackingServiceConfiguration {
  constructor(public enabled: boolean, public mixPanelToken: string) {}
}
