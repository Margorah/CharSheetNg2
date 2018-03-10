import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
// import * as UserActions from '../../app/store/actions/user-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

import { GLOBALS } from '../../APP_GLOBALS';
// import * as PREFERENCES from '../../app/models/preferences-model';

@Component({
  selector: 'app-menu',
  templateUrl: 'app-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMenuComponent {
  @Input() content;
  // private user: Observable<string>;
  private appName = GLOBALS.APP_NAME;
  private mode: Observable<string>;
  // private templateModeTestVar = PREFERENCES.MODE.ONLINE;
  // private templateNameTestVar = '';

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.user = this.store.select(fromRoot.getUsername);
    this.mode = this.store.select(fromRoot.getPrefMode);
  }

  // logout() {
  //   this.store.dispatch(new UserActions.Logout());
  // }

  // createUser() {
  //   this.store.dispatch(new NavActions.CreateUser());
  // }

  // login() {
  //   this.store.dispatch(new NavActions.Login());
  // }

  charList() {
    this.store.dispatch(new NavActions.CharacterList());
  }

  prefNav() {
    this.store.dispatch(new NavActions.Preferences());
  }

  showAbout() {
    this.store.dispatch(new NavActions.About());
  }

  showHelp() {
    this.store.dispatch(new NavActions.HelpSlidesMenu());
  }
}
