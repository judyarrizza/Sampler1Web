import { Injectable } from '@angular/core';
import { AuthService } from '@app/services/auth';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ApiService {

  /// loan change notifier
  private pendingChangesSubject = new Subject();
  pendingChanges$: Observable<{}> = this.pendingChangesSubject.asObservable();

  constructor( public authService: AuthService) { }

  getCurrentData(): Observable<any> {
    console.log('Get the current data');
    const url = `/sps/data`;
    return this.authService.authGet(url);
  }

  notifyCallerOfPendingChanges() {
    this.pendingChangesSubject.next();
  }

  ///// EXAMPLES

  examplePutEndpoint(): Observable<any> {
    const url = 'exampleurl';
    const body = {
      example: 'data'
    };
    return this.authService.authPut(url, body);
  }

  exampleDeleteEndpoint(borrowerId, assetId): Observable<any> {
    const url = 'exampleurl';
    return this.authService.authDelete(url);
  }

  examplePostEndpoint(): Observable<any> {
    const url = 'exampleurl';
    const body = {
      example: 'data'
    };
    return this.authService.authPost(url, body);
  }


  //////// Multi-purpose http error catcher

  onHttpFailure(info, error) {
    console.log(info + 'FAILURE');
    console.log(error);
  }

}
