import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonicPage, Slides } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as NavActions from '../../app/store/actions/nav-actions';
// import * as UserActions from '../../app/store/actions/user-actions';
import * as CharActions from '../../app/store/actions/character-actions';
import * as PrefActions from '../../app/store/actions/preferences-actions';

const SKIPTEXT = {
  INITALRUN: 'Skip',
  FROMMENU: 'Close'
};

@IonicPage()
@Component({
  selector: 'page-help-slides',
  templateUrl: 'help-slides.html',
})
export class HelpSlidesPage {
  @ViewChild(Slides) slides: Slides;
  appTitle = 'Flexible Character Sheet';
  demoChar = 'Itzal';
  demoMob = 'Goblin';
  demoMobExp = 500;
  demoMobDMG = 40;
  destroyedItem = 'Worn Duster';
  demoSpell = 'Fireball';

  skipText = SKIPTEXT.INITALRUN;
  fromMenu = false;
  changeInitSub: Subscription;
  changeInitObj: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.changeInitSub = this.store.subscribe((state) => {
      this.fromMenu = state.pref.init;
      this.skipText = this.fromMenu ? SKIPTEXT.FROMMENU : SKIPTEXT.INITALRUN;
    });
    this.changeInitObj = this.store.select(fromRoot.getPrefInit);
  }

  closeHelp() {
    if (this.fromMenu === true) {
      this.store.dispatch(new NavActions.Back());
    } else {
      this.store.dispatch(new PrefActions.ChangeInit(true));
      // this.store.dispatch(new UserActions.Load()); 
      this.store.dispatch(new CharActions.LoadMany());
    }
  }

  ngOnDestroy() {
    this.changeInitSub.unsubscribe();
  }
}
