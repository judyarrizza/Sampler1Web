import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MockEventService {
  private loanId: string | null = null;

  closeRequested$ = new BehaviorSubject<boolean>(false);

  constructor() {
    console.log('ServiceProviderSelectorWeb.MockEventService.constructor');
  }

  async start(loanId: string, appToken: string) {
    console.log('ServiceProviderSelectorWeb.MockEventService.start loanId', loanId);
    console.log('ServiceProviderSelectorWeb.MockEventService.start appToken', appToken);

    this.loanId = loanId;
  }

  close(): void {
    console.log('ServiceProviderSelectorWeb.MockEventService.close loanId', this.loanId);
  }

  processPendingChanges(): void {
    console.log('ServiceProviderSelectorWeb.MockEventService.processPendingChanges loanId', this.loanId);
  }
}
