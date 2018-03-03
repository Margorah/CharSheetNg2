import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';

import * as NavActions from '../../app/store/actions/nav-actions';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  closeText = 'Close';
  constructor(private store: Store<fromRoot.State>) {
  }

  closeAbout() {
    this.store.dispatch(new NavActions.Back()); 
  }
}
