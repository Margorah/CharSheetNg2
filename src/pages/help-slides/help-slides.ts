import { Component, OnInit, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
import { IonicPage, Slides } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as NavActions from '../../app/store/actions/nav-actions';
import * as CharActions from '../../app/store/actions/character-actions';
import * as PrefActions from '../../app/store/actions/preferences-actions';

const SKIP_TEXT = {
  INITAL_RUN: 'Skip',
  FROM_MENU: 'Close'
};

const URL_STUB = '../../assets/assets/help-slides/';
const INDEX_BEFORE_ANIMS_START = 2;

@IonicPage()
@Component({
  selector: 'page-help-slides',
  templateUrl: 'help-slides.html',
})
export class HelpSlidesPage {
  @ViewChild(Slides) slides: Slides;
  // Array of all img views
  @ViewChildren('imgs') images;
  appTitle = 'Flexible Character Sheet';
  demoChar = 'Vorq';
  demoMob = 'Goblin';
  demoMobExp = 100;
  demoMobDMG = 20;
  destroyedItem = 'Worn Duster';
  demoSpell = 'Fireball';

  skipText = SKIP_TEXT.INITAL_RUN;
  fromMenu = false;
  changeInitSub: Subscription;
  changeInitObj: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.changeInitSub = this.store.subscribe((state) => {
      this.fromMenu = state.pref.init;
      this.skipText = this.fromMenu ? SKIP_TEXT.FROM_MENU : SKIP_TEXT.INITAL_RUN;
    });
    this.changeInitObj = this.store.select(fromRoot.getPrefInit);
  }

  closeHelp() {
    if (this.fromMenu === true) {
      this.store.dispatch(new NavActions.Back());
    } else {
      this.store.dispatch(new PrefActions.ChangeInit(true));
      this.store.dispatch(new CharActions.LoadMany());
    }
  }

  slideIncrease() {
    const currSlide = this.slides.getActiveIndex();
    const prevSlide = currSlide - 1;
 
    // Slides with animations are 3 - end.
    if (currSlide > INDEX_BEFORE_ANIMS_START) {
      this.images.toArray().find((ele, index) => {
        // replace previous slide with still if on slide 4 or greater
        if (index == prevSlide && prevSlide > INDEX_BEFORE_ANIMS_START) {
          ele.nativeElement.setAttribute('src', this.buildSrc('STILL', prevSlide));
        }
        if (index == currSlide) {
          ele.nativeElement.setAttribute('src', this.buildSrc('ANIM', currSlide));
        }
      });
    }
  }

  slideDecrease() {
    const currSlide = this.slides.getActiveIndex();
    const prevSlide = currSlide + 1;

    if (currSlide >= INDEX_BEFORE_ANIMS_START) {
      this.images.toArray().find((ele, index) => {
        if (index == currSlide && currSlide > INDEX_BEFORE_ANIMS_START) {
          ele.nativeElement.setAttribute('src', this.buildSrc('ANIM', currSlide));         
        }
        if (index == prevSlide && prevSlide > INDEX_BEFORE_ANIMS_START) {
          ele.nativeElement.setAttribute('src', this.buildSrc('STILL', prevSlide));      
        }
      });
    }
  }

  buildSrc(type: string, index: number): string {
    let filename;

    if (type == 'ANIM') {
      filename = '/animation.gif';
    } else {
      filename = '/stillPre.png';
    }
    return URL_STUB + 'slide' + index + filename;
  }

  ngOnDestroy() {
    this.changeInitSub.unsubscribe();
  }
}
