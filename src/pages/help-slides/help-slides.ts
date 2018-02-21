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

@IonicPage()
@Component({
  selector: 'page-help-slides',
  templateUrl: 'help-slides.html',
})
export class HelpSlidesPage {
  @ViewChild(Slides) slides: Slides;
  skipText = 'Skip';
  appTitle = 'Simple Character Sheet';
  statDemoTitle = 'The Contrived Example';
  demoChar = 'Itzal';
  demoMob = 'Goblin';
  demoMobArmor = 'Worn Jerkin';
  demoMobArmorVal = 5;
  demoMobArmorValMax = 20;
  demoMobExp = 500;
  demoMobDMG = 40;
  demoMobDMGType = 'SDC';
  destroyedItem = 'Worn Duster';
  demoSpell = 'Fireball';
  demoSpellCost = 15;
  demoSpellType = 'PPE';
  manaName = 'Mana';
  newManaValue = 10;

  fromMenu = false;
  changeInitSub: Subscription;
  changeInitObj: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.changeInitSub = this.store.subscribe((state) => {
      this.fromMenu = state.pref.init;
      this.skipText = this.fromMenu ? 'Close' : 'Skip';
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

  jumpToWalk() {
    this.slides.slideTo(5);
  }

  jumpToAdd() {
    this.slides.slideTo(12);
  }

  ngOnDestroy() {
    this.changeInitSub.unsubscribe();
  }
}
