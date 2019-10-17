import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { AuthService } from '../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ld-get-token',
  templateUrl: './get-token.component.html'
})
export class GetTokenComponent implements OnChanges, OnDestroy {
  @Input() username = null;
  @Input() password = null;
  @Input() loginPath = null;
  @Input() apiPath = null;
  @Input() waitMessage = null;

  @Output() resolved: EventEmitter<string> = new EventEmitter();

  authStateSub: Subscription;

  constructor( public authService: AuthService,
               private cdr: ChangeDetectorRef) {

    this.authStateSub = authService.authState$.subscribe(data => {
        this.resolved.emit(data);
      }
    );
  }

  ngOnChanges() {
    console.log('INPUT PARAMETERS TO GET TOKEN');
    console.log(this.username);
    console.log(this.password);
    console.log(this.loginPath);
    console.log(this.apiPath);
    this.authService.login(this.username, this.password, this.loginPath, this.apiPath);
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.authStateSub) {
      this.authStateSub.unsubscribe();
    }
  }

}

