import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => console.log('FeesSpsWeb loaded'))
  .catch(error => console.log('FeesSpsWeb failed', error));
