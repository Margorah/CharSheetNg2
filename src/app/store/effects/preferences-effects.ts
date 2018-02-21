import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/mergeMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { StorageService } from '../../services/storage.service';

import { PreferenceState } from '../reducers/preferences-reducer';
import * as PREFERENCES from '../../models/preferences-model';

import * as PrefActions from '../actions/preferences-actions';
import * as NavActions from '../actions/nav-actions';
// import * as UserActions from '../actions/user-actions';
import * as CharActions from '../actions/character-actions';
import * as fromRoot from '../reducers';

@Injectable()
export class PreferencesEffects {
    @Effect()
    $load: Observable<Action> = this.actions$.ofType(PrefActions.LOAD)
        .mergeMap(() => this.storage.getPrefState())
        .withLatestFrom(this.store$.select(fromRoot.getPrefState), (storage: PreferenceState, store: PreferenceState) => {
            return {storage, store};
        })
        .mergeMap((state) => {
            let newActions: Action[] = [];
            if (state.storage === null) {
                // We are going to make sure preference
                newActions.push(new PrefActions.ChangeMode(PREFERENCES.MODE.OFFLINE));
                // The Effect observable $changeTheme will trigger whenever any preference is changed. Save should never need to be called
                newActions.push(new NavActions.HelpSlides());
            } else {
                newActions.push(new PrefActions.LoadSuccess(state.storage));
                // newActions.push(new UserActions.Load());
                // Circumvent UserAction and then call what it use to call
                newActions.push(new CharActions.LoadMany());
            }
            return newActions;
        });

    @Effect()
    $changeTheme: Observable<Action> = this.actions$.ofType(PrefActions.CHANGE_THEME, PrefActions.CHANGE_MODE, PrefActions.CHANGE_TIMER, PrefActions.CHANGE_INIT)
        .map(() => {
            return new PrefActions.Save();
        });

    @Effect({dispatch: false})
    $save: Observable<Action> = this.actions$.ofType(PrefActions.SAVE)
        .withLatestFrom(this.store$.select(fromRoot.getPrefState),  (action, state) => state)
        .map((state) => {
            this.storage.setPrefState(state);
            return null;
        });

    constructor(private store$: Store<fromRoot.State>, private actions$: Actions, private storage: StorageService) { }
}