import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class EventService implements OnDestroy {
  private subscription = new Subscription();

  private hubConnection!: HubConnection;

  private loanId: string | undefined = undefined;

  private closeRequestedSubject = new BehaviorSubject<boolean>(false);

  private connectionEstablishedSubject = new BehaviorSubject<boolean>(false);

  closeRequested$ = this.closeRequestedSubject.asObservable();

  connectionEstablished$ = this.connectionEstablishedSubject.asObservable();

  constructor(private environmentService: EnvironmentService) {
    console.log('ServiceProviderSelectorWeb.EventService.constructor');

    this.subscription.add(this.connectionEstablished$.pipe(first(established => !!established)).subscribe(() => this.joinChannel()));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private createConnection(url: string, appToken: string) {
    this.hubConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Error)
      .withUrl(url, { accessTokenFactory: () => appToken })
      .build();
  }

  private startConnection(): void {
    if (this.hubConnection) {
      this.hubConnection
        .start()
        .then(() => {
          console.log('ServiceProviderSelectorWeb.EventService.startConnection_then');
          this.connectionEstablishedSubject.next(true);
        })
        .catch(err => {
          console.error('ServiceProviderSelectorWeb.EventService.startConnection_catch', err);
          this.connectionEstablishedSubject.next(false);
          setTimeout(() => this.startConnection(), 5000);
        });
    } else {
      console.error('ServiceProviderSelectorWeb.EventService.startConnection hubConnection is falsy');
    }
  }

  private registerEvents(): void {
    this.hubConnection.on('CloseRequestedAsync', () => {
      console.log('ServiceProviderSelectorWeb.EventService.registerEvents_on_CloseRequestedAsync');
      this.closeRequestedSubject.next(true);
    });
  }
  private joinChannel(): void {
    console.log('ServiceProviderSelectorWeb.EventService.joinChannel loanId', this.loanId);
    this.hubConnection.invoke('JoinChannelAsync', this.loanId);
  }

  async start(loanId: string, appToken: string) {
    this.loanId = loanId;

    const environment = await this.environmentService.environment;

    this.createConnection(`${environment.serviceProviderSelectorEventsUrl}/events`, appToken);
    this.registerEvents();
    this.startConnection();
  }

  close(): void {
    console.log('ServiceProviderSelectorWeb.EventService.close loanId', this.loanId);
    this.hubConnection.invoke('CloseAsync', this.loanId);
  }

  navigateToUrla(): void {
    console.log('ServiceProviderSelectorWeb.EventService.navigateToUrla loanId', this.loanId);
    this.hubConnection.invoke('NavigateToUrlaAsync', this.loanId);
  }

  processPendingChanges(): void {
    console.log('ServiceProviderSelectorWeb.EventService.processPendingChanges loanId', this.loanId);
    this.hubConnection.invoke('ProcessPendingChangesAsync', this.loanId);
  }
}
