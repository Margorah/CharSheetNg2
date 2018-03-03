import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { App } from 'ionic-angular';

import * as NavActions from '../actions/nav-actions';
import * as CharacterActions from '../actions/character-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class NavEffects {
    @Effect({dispatch: false})
    backNav$: Observable<Action> = this.actions$.ofType(NavActions.BACK)
        .map(() => {
            this.navCtrl().pop();
            return null;
        });

    @Effect({dispatch: false})
    stacktNav$: Observable<Action> = this.actions$.ofType(
        // NavActions.LOGIN, NavActions.CREATE_USER, 
        NavActions.CREATE_CHARACTER, NavActions.PREFERENCES, NavActions.HELP_SLIDES_MENU, NavActions.ABOUT)
        .withLatestFrom(this.store$.select(fromRoot.getNavStackPage), (action, page) => {
            this.navCtrl().push(page);
            return null;
        });

    @Effect()
    // Add logic to not always dispatch unselect?
    charListNav$: Observable<Action> = this.actions$.ofType(NavActions.CHARACTER_LIST)
        .withLatestFrom(this.store$.select(fromRoot.getNavRootPage), (action, page) => {
            this.navCtrl().setRoot(page);
            return new CharacterActions.Unselect();
        });

    @Effect({dispatch: false})
    charSheetNav$: Observable<Action> = this.actions$.ofType(NavActions.CHARACTER_SHEET, )
        .withLatestFrom(this.store$.select(fromRoot.getNavRootPage), (action, page) => {
            this.navCtrl().setRoot(page);
            return null;
        });

    @Effect({dispatch: false})
    createStatNav$: Observable<Action> = this.actions$.ofType(NavActions.CREATE_STAT)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getNavStackPage), (mode, page) => {
            if (mode) {
                this.navCtrl().push(page, mode);
            } else {
                this.navCtrl().push(page);               
            }
            return null;
        });

    @Effect({dispatch: false})
    helpSlidesNav$: Observable<Action> = this.actions$.ofType(NavActions.HELP_SLIDES)
        .withLatestFrom(this.store$.select(fromRoot.getNavRootPage), (action, page) => {
            this.navCtrl().setRoot(page);
            return null;
        });
   
    constructor(private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private app: App) { }

    navCtrl() {
        return this.app.getActiveNavs()[0];
    };
}
