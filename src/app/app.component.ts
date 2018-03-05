import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './store/reducers';
// import * as UserActions from './store/actions/user-actions';
import * as PreferencesActions from './store/actions/preferences-actions';

@Component({
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Ng4 CharSheet Store';
  rootPage:any;
  private currentTheme: Observable<string>;

  constructor(platform: Platform,
              statusBar: StatusBar,
              private store: Store<fromRoot.State>) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.store.dispatch(new PreferencesActions.CloseSplash());
      this.store.dispatch(new PreferencesActions.Load());
      // this.store.dispatch(new UserActions.Load());
      // get preferences and see if we are in an initial state
      statusBar.styleDefault();
    });
  }

  ngOnInit() {
    this.currentTheme = this.store.select(fromRoot.getPrefTheme);
  }
}
