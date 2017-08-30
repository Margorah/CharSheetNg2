import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as UserActions from '../../app/store/actions/user-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

/**
 * Generated class for the AppDrawComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-menu',
  templateUrl: 'app-menu.html'
})
export class AppMenuComponent {
  @Input() content;
  private user: Observable<string>

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.user = this.store.select(fromRoot.getUsername);
  }

  logout() {
    this.store.dispatch(new UserActions.Logout());
  }

  charList() {
    this.store.dispatch(new NavActions.CharacterList());
  }
}
