import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as NavActions from '../../app/store/actions/nav-actions';
import { GLOBALS } from '../../APP_GLOBALS';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  private appName = GLOBALS.APP_NAME;
  private appVersion = GLOBALS.APP_VERSION;

  constructor(private store: Store<fromRoot.State>) {
  }

  closeAbout() {
    this.store.dispatch(new NavActions.Back()); 
  }
}
